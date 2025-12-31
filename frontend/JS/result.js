const urlParams = new URLSearchParams(window.location.search);

const studentName = urlParams.get("studentName");
const score = urlParams.get("score");
const total = Number(urlParams.get("total"));
const percentage = (score/total)*100;

document.getElementById("studentName").textContent = `Student : ${studentName}`;
document.getElementById("score").textContent = `Correct Answer : ${score}`;
document.getElementById("percentage").textContent = `Percentage : ${percentage}%`;
