
import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await dbConnect();
    
    // Check if connection is established
    const connectionState = db.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    const connectionStatus = states[connectionState] || 'unknown';
    
    console.log('MongoDB Connection Status:', connectionStatus);
    
    // Try a simple database operation
    const adminDb = db.connection.db.admin();
    const pingResult = await adminDb.ping();
    
    return NextResponse.json({
      status: 'success',
      connectionStatus,
      dbState: connectionState,
      pingResult,
      message: 'MongoDB connection test successful'
    });
    
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'MongoDB connection test failed',
      error: error.message
    }, { status: 500 });
  }
}