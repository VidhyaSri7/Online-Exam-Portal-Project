package com.example.calm.Controller;

import com.example.calm.Model.Exam;
import com.example.calm.Model.Question;
import com.example.calm.Model.Result;
import com.example.calm.Service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ExamController {

    @Autowired
    private ExamService examService;

    // GET
    @GetMapping("/exams")
    public List<Exam> getExams(){
        return examService.getAllExams();
    }
    @GetMapping("/questions/{examId}")
    public List<Question> getQuestions(@PathVariable Long examId){
        return examService.getQuestionsByExamId(examId);
    }

    @GetMapping("/results/{studentName}")
    public List<Result> getStudentsResults(@PathVariable String studentName){
        return examService.getResultsByStudent(studentName);
    }
    @GetMapping("/result")
    public List<Result> getAllResult(){
        return examService.getAllResults();
    }

    // POST
    @PostMapping("/exam")
    public Exam createExam(@RequestBody Exam exam)
    {
        return examService.saveExam(exam);

    }

    @PostMapping("/questions")
    public ResponseEntity<List<Question>> savedQuestions(@RequestBody List<Question> questions){
        List<Question> savedQuestions = examService.saveQuestions(questions);
        return new ResponseEntity<>(savedQuestions,HttpStatus.CREATED);
    }

    @PostMapping("/submit")
    public Result submitExam(@RequestBody Result result){
        return examService.submitResult(result);
    }

    // DELETE
    @DeleteMapping("/exam/{id}")
    public ResponseEntity<String> deleteExam(@PathVariable Long id){
        boolean deleted = examService.deleteExamById(id);

        if(deleted){
            return ResponseEntity.ok(" ✅ Exam Deleted Successfully.");
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Exam not Found.");
        }
    }

    @DeleteMapping("/question/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id){
        boolean deleted = examService.deleteQuestionById(id);
        if(deleted){
            return ResponseEntity.ok(" ✅ Question Deleted Successfully.");
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not Found.");
        }
    }

}
