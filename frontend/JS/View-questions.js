const baseUrl = 'http://localhost:8080/api';

async function loadExams(){
    try{
        const res = await fetch(`${baseUrl}/exams`);

        if(!res.ok) throw new Error('Failed fetching exams');

        const exams = await res.json();
        const select = document.getElementById('examSelect');
        select.innerHTML = '<option value="">-- Select Exam --</option>';

        exams.forEach(exam =>{
            const opt = document.createElement('option');
            opt.value = exam.id;
            opt.textContent = exam.title;
            select.appendChild(opt);
        });
    }catch(e){
        alert('Error Loading Exam : '+e.message);
    }
}

async function loadQuestionForExam(examId){
    const table = document.getElementById('questionTable')
    const tbody = document.getElementById('questionsBody')
    const noQMsg = document.getElementById('noQuestionMsg');

    tbody.innerHTML = '';
    table.style.display = 'none';
    noQMsg.style.display = 'none';

    if(!examId) return; 

    try{
        const res = await fetch(`${baseUrl}/questions/${examId}`);
        if(!res.ok) throw new Error('Failed fetching questions');
        const questions = await res.json();

        if(questions.length ===0){
            noQMsg.style.display ='block';
            return;
        }

        questions.forEach((q,i)=>{
            const tr = document.createElement('tr');

            tr.innerHTML = `
            <td>${i+1}</td>
            <td>${q.questionText}</td>
            <td>${q.optionA}</td>
            <td>${q.optionB}</td>
            <td>${q.optionC}</td>
            <td>${q.optionD}</td>
            <td>${q.correctOption}</td>

            <td><button class="delete-btn" data-qid="${q.id}">Delete</button></td>
            `;
            tbody.appendChild(tr);
        });

        table.style.display = 'table';

        document.querySelectorAll('button.delete-btn').forEach(btn=>{
            btn.addEventListener('click' , async function(){
                const questionId = this.getAttribute('data-qid');
                if(confirm('Are you sure want to delete this question ? ')){
                    try{
                        const delRes = await fetch(`${baseUrl}/question/${questionId}`,{
                            method:'DELETE'
                        });

                        if(!delRes.ok) throw new Error('Delete Failed');

                        alert('✅ Question deleted successfully.')
                        loadQuestionForExam(examId); 
                    }catch(e){
                        alert('Error Deleting question'+e.message)
                    }
                }
            });
        });
    }catch(e){
        alert('ERROR  Loading Questions : '+e.message);
    }
}

document.getElementById('examSelect').addEventListener('change',e=>{
    loadQuestionForExam(e.target.value);
})

window.addEventListener('DOMContentLoaded',loadExams);
view-result.js
fetch('http://localhost:8080/api/result')
    .then(res=>res.json())
    .then(data => {

        const table = document.getElementById('resultTable');
        data.forEach(r=>{
            table.innerHTML += `
            <tr>
             <td>${r.id}</td>
             <td>${r.studentName}</td>
             <td>${r.examId}</td>
             <td>${r.score}</td>
            </tr>
            `;
        });
    })
    .catch(()=>{
        document.getElementById("resultTable").innerHTML = "<tr><td colspan='4'>Failed to load result</td></tr>";
    }) 
