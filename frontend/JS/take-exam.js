const baseUrl = 'http://localhost:8080/api'
const examId = new URLSearchParams(window.location.search).get("examId");

fetch(`${baseUrl}/questions/${examId}`)
.then(res => res.json())
.then(questions =>{
    const form = document.getElementById("examForm");

    questions.forEach((q,i)=>{
        const questionHtml =`
        <p><strong>${i+1}. ${q.questionText}</strong></p>
        <label><input type="radio" name="q${q.id}" value="A">${q.optionA}</label>
        <label><input type="radio" name="q${q.id}" value="B">${q.optionB}</label>
        <label><input type="radio" name="q${q.id}" value="C">${q.optionC}</label>
        <label><input type="radio" name="q${q.id}" value="D">${q.optionD}</label><br><br>
        `;
        form.innerHTML +=questionHtml;
    })

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Submit";

    btn.onclick = () => submitExam(questions);
    form.appendChild(btn);
});

function submitExam(questions){

    let score=0;
    let unanswered = false;

    questions.forEach(q =>{
        const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
        if(!selected){
            unanswered = true;
        }else if(selected.value === q.correctOption){
            score++;
        }
    });

    if(unanswered){
        alert("Please answer all questions before submitting.")
        return;
    }

    const student = prompt("Enter your Name");
    if(!student) return;

    fetch(`${baseUrl}/submit`,{
        method: "POST",
        headers : {'Content-Type' :'application/json'},
        body : JSON.stringify({
            examId:Number(examId),
            studentName : student,
            score : score
        })
    }).then(res=>{
        if(res.ok){
            alert(`✅ Submitted successfully. Score: ${score}/${questions.length}`);
            window.location.href = `result.html?studentName=${encodeURIComponent(student)}&score=${score}&total=${questions.length}`;
        }else{
            alert("❌ Failed to Submit result.");
        }
    });
}
