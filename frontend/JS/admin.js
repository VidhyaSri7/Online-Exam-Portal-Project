const baseUrl = 'http://localhost:8080/api';

async function loadExams() {
    try{
        const res = await fetch(`${baseUrl}/exams`);
        const exams = await res.json();
        const examSelect = document.getElementById('examSelect');
        examSelect.innerHTML= `<option value="">--Select Exam--</option>`;
        for(const exam of exams){
            examSelect.innerHTML += `<option value="${exam.id}">${exam.title}</option>`;
        }
    }catch(err){
        alert("❌ Could not Load exams");
    }
}

// Exam
document.getElementById('createExamForm').addEventListener('submit' ,async function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    
    if(!title) return alert('Please Enter exam title');

    const res = await fetch(`${baseUrl}/exam`,{
        method : 'POST',
        headers:{'Content-Type':'application/json'},
        body : JSON.stringify({title:title})
    });

    if(!res.ok) return alert('❌Failed to create Exam');
    alert('✅ Exam Created!');
    this.reset();
    await loadExams();
});

function createQuestionElement(idx){
    const div = document.createElement('div');
    div.className='question-block';
    div.innerHTML = `
    <label>Question ${idx+1}:</label>
    <input type="text" name="questionText" placeholder="Enter question text" required/> <br>
    <label>Option A : </label>
    <input type="text" name="optionA" required>
    <label>Option B : </label>
    <input type="text" name="optionB" required>
    <label>Option C : </label>
    <input type="text" name="optionC" required>
    <label>Option D : </label>
    <input type="text" name="optionD" required>

    <label>Correct Option : </label>
    <select name="correctOption" required>
        <option values="">Select Correct Option</option>

        <option values="A">A</option>
        <option values="B">B</option>
        <option values="C">C</option>
        <option values="D">D</option>
    </select>

    <button type="button" class="remove-btn">Remove Question</button>
    `;
    div.querySelector('.remove-btn').addEventListener('click',()=>{
        div.remove();
        updateQuestionLabels();
    });
    return div;
}

function updateQuestionLabels(){
    document.querySelectorAll('.question-block').forEach((block,i) => {
        block.querySelector('label').textContent = `Question ${i+1} : `
    });
}

document.getElementById('addQuestionBtn').addEventListener('click',()=>{
    const questionsContainer = document.getElementById('questionsContainer');
    questionsContainer.appendChild(createQuestionElement(questionsContainer.children.length));
});

// Submit
document.getElementById('addQuestionForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const examId = document.getElementById('examSelect').value;
    if(!examId) return alert('Please select an Exam');

    const questionBlock = document.querySelectorAll('.question-block');

    if(questionBlock.length===0) return alert('Please add at least one question');

    const questions = [];
    for(const block of questionBlock){
        const questionText = block.querySelector('input[name="questionText"]').value.trim();
        const optionA = block.querySelector('input[name="optionA"]').value.trim();
        const optionB = block.querySelector('input[name="optionB"]').value.trim();
        const optionC = block.querySelector('input[name="optionC"]').value.trim();
        const optionD = block.querySelector('input[name="optionD"]').value.trim();
        const correctOption = block.querySelector('select[name="correctOption"]').value;

        if(!questionText || !optionA || !optionB || !optionC || !optionD || !correctOption){
            alert('❌ Please fill all fields for each question.')
            return;
        }

        questions.push(
            {
                questionText,
                optionA,
                optionB,
                optionC,
                optionD,
                correctOption,
                examId:parseInt(examId)
            }
        );
    }

    const res = await fetch(`${baseUrl}/questions`,{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify(questions)
    });

    if(!res.ok) return alert('❌ Failed to Add Questions');
    alert('✅ Question Added');

    document.getElementById('questionsContainer').innerHTML = '';
})

// load exam
window.addEventListener('DOMContentLoaded',loadExams)
