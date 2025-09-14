import familyPartnerConversation from './data/family_partner_conversation.json';
import artistStageTalk from './data/artist_stage_talk.json';
import functionalWearExhibition from './data/functional_wear_exhibition.json';
import startupInvestmentMeeting from './data/startup_investment_meeting.json';
import foodTradeFair from './data/food_trade_fair.json';
import fanmeetingQA from './data/fanmeeting_qa.json';
import moviePremiereQA from './data/movie_premiere_qa.json';
import plannerJobInterview from './data/planner_job_interview.json';
import hospitalConsultation from './data/hospital_consultation.json';

// 모든 스크립트를 하나의 배열로 통합하여 export
export const learningSamples = [
  artistStageTalk,
  hospitalConsultation,
  functionalWearExhibition,
  fanmeetingQA,
  familyPartnerConversation,
  foodTradeFair,
  startupInvestmentMeeting,
  moviePremiereQA,
  plannerJobInterview,
];

// 프롬프트 템플릿
export const promptTemplate = `일본어-한국어 통역 연습을 위한 JSON 스크립트를 생성해주세요.

아래 형식에 맞춰 작성해주세요:

{
  "topic": "대화 상황 또는 주제",
  "script": [
    { "speaker": "A", "jp": "일본어 문장", "kr": "한국어 문장" },
    { "speaker": "B", "jp": "일본어 문장", "kr": "한국어 문장" }
  ]
}

요구사항:
- topic: 반드시 구체적인 상황이나 주제를 작성 (예: 공항 체크인, 호텔 예약, 비즈니스 미팅 등)
- script: 대화 배열 (최소 10개 이상의 주고받는 대화)
- speaker: "A" 또는 "B" (두 명의 화자)
- jp: 실제 일본인이 자주 쓰는 자연스러운 구어체 문장, 반말/존댓말/격식체를 상황에 맞게 사용
- kr: 실제 한국인이 자주 쓰는 자연스러운 구어체 문장, 반말/존댓말/격식체를 상황에 맞게 사용
- 한국어 문장과 일본어 문장은 직역이 아닌 자연스럽고 맥락에 맞는 문장이어야 함
- 다운로드 가능하도록 .json 파일 형식으로 생성
- 비즈니스 대화일 경우 실제 업계 용어 활용할 것
- 일상 대화인 경우 너무 딱딱하지 않은 말투로 실제 일상에서 사용하는 자연스러운 말투로

주제: [여기에 원하는 상황이나 주제를 입력하세요]`;
