/**
 * JWT utility functions for decoding and validating JSON Web Tokens
 * Using the 'jose' library for robust JWT handling
 */

import { decodeJwt, type JWTPayload } from 'jose';

// Re-export JWTPayload from jose for convenience
export type JwtPayload = JWTPayload;

/**
 * Decodes a JWT token without verification using jose library
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export function decodeJwtToken(token: string): JwtPayload | null {
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    return decodeJwt(token);
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
