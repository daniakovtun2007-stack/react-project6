package com.example.reactproject6.auth;

public record AuthResponse(String token, String tokenType, long expiresIn) {
}
