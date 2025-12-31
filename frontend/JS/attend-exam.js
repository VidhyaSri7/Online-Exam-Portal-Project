document.addEventListener("DOMContentLoaded", () => {
      const baseUrl = 'http://localhost:8080/api';
      
      fetch(`${baseUrl}/exams`)
        .then(res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then(data => {
          const container = document.getElementById("examList");
          if (!data.length) {
            container.innerHTML = "<p style='text-align:center;'>No exams found</p>";
            return;
          }
          data.forEach(e => {
            const card = document.createElement("div");
            card.className = "exam-card";
            card.innerHTML = `
              <div class="exam-title">${e.title}</div>
              <a class="exam-button" href="exam.html?examId=${e.id}">Start Exam</a>
            `;
            container.appendChild(card);
          });
        })
        .catch(err => {
          console.error("Failed to fetch exams:", err);
          document.getElementById("examList").innerHTML = "<p>Error loading exams</p>";
        });
    });
