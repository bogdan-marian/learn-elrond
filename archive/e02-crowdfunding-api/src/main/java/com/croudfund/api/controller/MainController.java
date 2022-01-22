package com.croudfund.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.Date;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

@RestController
public class MainController {
    private static final String TEST_ENV = "TEST_ENV";

    private static class StreamGobbler implements Runnable {
        private InputStream inputStream;
        private Consumer<String> consumer;

        public StreamGobbler(InputStream inputStream, Consumer<String> consumer) {
            this.inputStream = inputStream;
            this.consumer = consumer;
        }

        @Override
        public void run() {
            new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(consumer);
        }
    }

    @RequestMapping("/")
    public String home() {
        String simpleResponse = "<html><head><title>Hello Elrond</title></head><body>" 
        + "<div>Hello body</div>"
            + "<ul>" 
                + "<li><a href=\"./ping\">ping</a></li>"
                + "<li><a href=\"./runErdpyVersion\">runErdpyVersion</a></li>"
                + "<li><a href=\"./deployContract\">deployContract</a></li>" 
            + "</ul>" 
        + "</body></html>";
        return simpleResponse;
    }

    @RequestMapping("/ping")
    public MainResponse ping() {
        String testEnv = System.getenv(TEST_ENV);

        MainResponse response = new MainResponse();
        response.message = "Hello there. this is a ping";
        response.envValue = testEnv;

        return response;
    }

    @RequestMapping("/runErdpyVersion")
    public MainResponse runErdpyVersion() throws IOException, InterruptedException {
        MainResponse response = new MainResponse();
        StringBuilder sb = new StringBuilder();
        Consumer<String> sc = sb::append;

        ProcessBuilder builder = new ProcessBuilder();

        /*
         * Properties that you can use - user.dir - user.home
         */
        String dir = System.getProperty("user.home") + "/mycontract";
        builder.directory(new File(dir));
        builder.command("sh", "-c", "erdpy --version");
        // builder.command("sh", "-c", "pwd");

        Process process = builder.start();
        StreamGobbler streamGobbler = new StreamGobbler(process.getInputStream(), sc);
        Executors.newSingleThreadExecutor().submit(streamGobbler);
        response.exitCode = process.waitFor();

        // reader is not consistent commands need to wait
        Thread.sleep(25);

        Date date = new Date();
        response.bashResponse = sb.toString();
        response.timeStamp = date.getTime();
        return response;
    }

    @RequestMapping("/deployContract")
    public MainResponse deployContract() throws IOException, InterruptedException {
        MainResponse response = new MainResponse();
        StringBuilder sb = new StringBuilder();
        Consumer<String> sc = sb::append;

        ProcessBuilder builder = new ProcessBuilder();

        /*
         * Properties that you can use - user.dir - user.home
         */
        String dir = System.getProperty("user.home") + "/mycontract/interaction";
        builder.directory(new File(dir));
        // builder.command("sh", "-c", "erdpy --version");
        builder.command("sh", "-c", "./deploy.snippet.sh");

        Process process = builder.start();
        StreamGobbler streamGobbler = new StreamGobbler(process.getInputStream(), sc);
        Executors.newSingleThreadExecutor().submit(streamGobbler);
        response.exitCode = process.waitFor();

        // reader is not consistent commands need to wait
        Thread.sleep(25);

        response.bashResponse = sb.toString();
        String[] sections = response.bashResponse.split(":");
        Date date = new Date();
        response.timeStamp = date.getTime();

        if (sections.length == 2) {
            String message = sections[0];
            if (!"Smart contract address".equals(message)) {
                response.error = true;
                return response;
            }

        }

        String address = sections[1];
        response.bashResponse = response.bashResponse + " length = " + address.length();
        response.contractAddress = address;

        response.error = false;
        return response;
    }
}
