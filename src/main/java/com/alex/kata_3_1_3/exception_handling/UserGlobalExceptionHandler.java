package com.alex.kata_3_1_3.exception_handling;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserGlobalExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<UserIncorrectData> exceptionHandler(NoSuchUserException e){
        return new ResponseEntity<>(new UserIncorrectData(e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<UserIncorrectData> exceptionHandler(Exception e){
        return new ResponseEntity<>(new UserIncorrectData(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
