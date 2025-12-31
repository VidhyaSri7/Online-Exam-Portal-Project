fetch('http://localhost:8080/api/exams')
    .then(res=>res.json())
    .then(data => {

        const table = document.getElementById('examTable');
        data.forEach(r=>{
            table.innerHTML += `
            <tr>
             <td>${r.id}</td>
             <td>${r.title}</td>
            </tr>
            `;
        });
    })
    .catch(()=>{
        document.getElementById("examTable").innerHTML = "<tr><td colspan='4'>Failed to load Exam List</td></tr>";
    })   
