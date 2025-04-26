package com.agriconnect.backend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RequestInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // Log request details
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("X-User-Name header: " + request.getHeader("X-User-Name"));
        
        return true; // Allow request to proceed
    }
}