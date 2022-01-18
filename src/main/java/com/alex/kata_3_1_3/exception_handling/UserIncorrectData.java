package com.alex.kata_3_1_3.exception_handling;

public class UserIncorrectData {
    private String info;

    public UserIncorrectData() {
    }

    public UserIncorrectData(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}
