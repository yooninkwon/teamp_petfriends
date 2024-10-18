package com.tech.petfriends.login.util;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

public class PasswordEncryptionService {

    // 비밀번호 암호화 메소드
    public String encryptPassword(String password) {
        Argon2 argon2 = Argon2Factory.create();
        try {
            // Argon2 해시 생성 (메모리 비용, 병렬도, 해시 시간 조절 가능)
            return argon2.hash(2, 65536, 1, password.toCharArray());
        } finally {
            argon2.wipeArray(password.toCharArray()); // 비밀번호 배열을 메모리에서 지움
        }
    }

    // 비밀번호 검증 메소드
    public boolean verifyPassword(String hash, String password) {
        Argon2 argon2 = Argon2Factory.create();
        return argon2.verify(hash, password.toCharArray());
    }
}

