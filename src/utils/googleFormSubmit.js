const url = import.meta.env.VITE_GOOGLE_SCRIPT_WEBAPP_URL;

export const sendFeedback = async ({ name, email, message }) => {
  // 환경 변수 확인
  if (!url) {
    console.error('VITE_GOOGLE_SCRIPT_WEBAPP_URL이 설정되지 않았습니다.');
    return false;
  }

  console.log('요청 URL:', url); // 디버깅용

  const formData = new URLSearchParams();
  formData.append('name', name || '');
  formData.append('email', email || '');
  formData.append('message', message || '');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
      // mode: 'no-cors', // 필요한 경우 주석 해제
    });

    // 응답 상태 확인
    console.log('응답 상태:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.text();
    console.log('응답:', result);

    return result.trim().toLowerCase() === 'success';
  } catch (error) {
    console.error('의견 전송 실패:', error);
    return false;
  }
};
