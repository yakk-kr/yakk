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
  familyPartnerConversation,
  artistStageTalk,
  functionalWearExhibition,
  startupInvestmentMeeting,
  foodTradeFair,
  fanmeetingQA,
  moviePremiereQA,
  plannerJobInterview,
  hospitalConsultation,
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
- topic: 구체적인 상황이나 주제 (예: 공항 체크인, 호텔 예약, 비즈니스 미팅 등)
- script: 대화 배열 (최소 5개 이상의 주고받는 대화)
- speaker: "A" 또는 "B" (두 명의 화자)
- jp: 자연스러운 일본어 문장
- kr: 해당하는 한국어 번역

주제: [여기에 원하는 상황이나 주제를 입력하세요]`;
