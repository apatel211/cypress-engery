import { NextResponse } from 'next/server';

const VALID_USERNAME = 'testuser';
const VALID_PASSWORD = 'testuser2025';
const MOCK_TOKEN = 'mock-jwt-token-12345';

/**
 * Simulates a mock login endpoint
 * @param req Request containing username and password
 * @returns Validation response
 */
export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      return NextResponse.json(
        { message: 'Login successful', token: MOCK_TOKEN },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}
