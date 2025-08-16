import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { EnergyUsage, EnergyUsageRecord } from '../../types';

const FILENAME = 'data.json';

/**
 * Simulates a mock endpoint which fetches saved energy consumption from local data.json
 */
export async function GET() {
  const filePath = path.join(process.cwd(), FILENAME);

  try {
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      const data: EnergyUsage = JSON.parse(fileData);

      return NextResponse.json({ ...data }, { status: 200 });
    }

    return NextResponse.json(
      { message: `Could not find file path ${filePath}` },
      { status: 400 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
  }
}

/**
 * Simulates a mock endpoint which saves a new record of energy consumption to local data.json
 */
export async function POST(req: NextRequest) {
  const filePath = path.join(process.cwd(), FILENAME);

  try {
    const body = await req.json();
    if (!body || !isEnergyUsageFormData(body)) {
      return NextResponse.json(
        { message: 'Invalid data format' },
        { status: 400 }
      );
    }

    let data: EnergyUsage = {
      records: [],
    };

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      data = JSON.parse(fileData) as EnergyUsage;
    }

    data.records.push(body);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

    return NextResponse.json(
      { message: 'Energy usage saved successfully!' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to save energy usage' },
      { status: 500 }
    );
  }
}

const isEnergyUsageFormData = (data: unknown): data is EnergyUsageRecord => {
  if (typeof data !== 'object' || data === null) return false;
  const { nmi, consumption, unit, timestamp, id } = data as EnergyUsageRecord;
  return !!(nmi && consumption && unit && timestamp && id);
};
