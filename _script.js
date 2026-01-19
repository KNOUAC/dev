let questions = [];
let currentIdx = 0;

// 1. 문제 데이터 가져오기
fetch('questions.json')
    .then(res => res.json())
    .then(data => {
        questions = data;
        showQuestion();
    });

// 2. 문제 화면에 표시
function showQuestion() {
    const q = questions[currentIdx];
    document.getElementById('question-text').innerText = `Q${currentIdx + 1}. ${q.question}`;
    
    const optsDiv = document.getElementById('options-container');
    optsDiv.innerHTML = ''; // 기존 보기 초기화
    document.getElementById('result-box').style.display = 'none';

    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(idx);
        optsDiv.appendChild(btn);
    });
}

// 3. 정답 확인
function checkAnswer(selectedIdx) {
    const q = questions[currentIdx];
    const resultBox = document.getElementById('result-box');
    const msg = document.getElementById('result-msg');
    
    resultBox.style.display = 'block';
    document.getElementById('explanation').innerText = "해설: " + q.explanation;

    if (selectedIdx === q.answer) {
        msg.innerText = "정답입니다! 🎉";
        msg.className = "correct";
    } else {
        msg.innerText = "틀렸습니다. 😅";
        msg.className = "wrong";
    }
}

// 4. 다음 문제로 이동
function nextQuestion() {
    currentIdx++;
    if (currentIdx < questions.length) {
        showQuestion();
    } else {
        alert("모든 문제를 풀었습니다!");
        currentIdx = 0;
        showQuestion();
    }
}
