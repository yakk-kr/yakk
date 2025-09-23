import axios from 'axios';

// 간단한 키워드 입력인지 판별하는 함수
function isKeywordOnly(prompt) {
  return (
    prompt.length < 30 || (!prompt.includes('상황') && !prompt.includes('대화'))
  );
}

// 최종 프롬프트 생성 함수
export function buildUserPrompt(input) {
  if (isKeywordOnly(input)) {
    return `"${input}"라는 키워드를 일본어-한국어 통역 연습용 대화 스크립트로 구성해줘. 주고받는 형식의 대화로 최소 10문장 이상, 실제 면접 또는 회화처럼 자연스럽게 써줘.`;
  }
  return input;
}

// GPT 호출 함수
export async function fetchFromGPT(prompt) {
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `일본어-한국어 통역 연습을 위한 JSON 스크립트 생성
아래 형식에 맞춰 작성:
{
  "topic": "대화 상황 또는 주제",
  "script": [
    { "speaker": "A", "jp": "일본어 문장", "kr": "한국어 문장" },
    { "speaker": "B", "jp": "일본어 문장", "kr": "한국어 문장" }
  ]
}
요구사항:
- topic: 구체적인 상황이나 주제를 작성
- script: 대화 배열(최소 16개 이상의 주고받는 대화)
- speaker: "A" 또는 "B"
- jp, kr: 실제 일본인이 자주 쓰는 자연스러운 구어체 문장, 반말/존댓말/격식체를 상황에 맞게 사용
- 한국어 문장과 일본어 문장 모두 직역체가 아닌 자연스러운 대화체
- 비즈니스 대화일 경우 실제 업계 용어 활용
- 일상 대화인 경우 너무 딱딱하지 않은 말투, 실제 일상에서 사용하는 자연스러운 말투`,
        },
        {
          role: 'user',
          content: buildUserPrompt(prompt),
        },
      ],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.choices[0].message.content;
}
