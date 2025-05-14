package com.FinalProject.AfterYou.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.security.Key;

@Service
public class JWTService {

    // Existing fields
    private String secretKey = "";

    // New configuration fields
    @Value("${jwt.expiration:10800000}") // Default 3 hours
    private long jwtExpirationMs;

    @Value("${jwt.issuer:AfterYou}")
    private String jwtIssuer;

    // Existing constructor
    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generating JWT secret key", e);
        }
    }

    // Existing method - unchanged
    public String generateToken(String userEmail) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(userEmail)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 3 * 60 * 60 * 1000))
                .and()
                .signWith(getKey())
                .compact();
    }

    // New overloaded method with custom claims
    public String generateToken(String userEmail, Map<String, Object> extraClaims) {
        return Jwts.builder()
                .claims(extraClaims)
                .subject(userEmail)
                .issuer(jwtIssuer)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getKey())
                .compact();
    }

    // Existing method - unchanged
    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Existing method - unchanged
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Existing method - unchanged
    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    // Existing method - unchanged
    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Existing method - unchanged
    public boolean validateToken(String token, UserDetails userDetails) {
        final String userEmail = extractUserName(token);
        return (userEmail.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Existing method - unchanged
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Existing method - unchanged
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // NEW METHODS ADDED BELOW (without changing existing ones)

    /**
     * Gets the expiration time in milliseconds
     */
    public long getJwtExpirationMs() {
        return jwtExpirationMs;
    }

    /**
     * Gets the issuer name
     */
    public String getJwtIssuer() {
        return jwtIssuer;
    }

    /**
     * Gets the time until expiration in seconds
     */
    public long getRemainingValidity(String token) {
        final Date expiration = extractExpiration(token);
        final Date now = new Date();
        return (expiration.getTime() - now.getTime()) / 1000;
    }

    /**
     * Checks if token will expire within the given time (in seconds)
     */
    public boolean willExpireSoon(String token, long seconds) {
        return getRemainingValidity(token) <= seconds;
    }

    /**
     * Extracts all headers from the token
     */
    public Map<String, Object> extractHeaders(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getHeader();
    }

    /**
     * Extracts a specific claim by name
     */
    public Object getClaimByName(String token, String claimName) {
        return extractAllClaims(token).get(claimName);
    }
}