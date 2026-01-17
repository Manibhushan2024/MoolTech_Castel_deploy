/**
 * Backend Operations Logger
 * Logs all dashboard operations (save, ignore, send draft) without page reload
 * Stores in-memory or database for audit trail
 */

import { NextRequest, NextResponse } from 'next/server'

// In-memory store (for MVP - replace with database for production)
const operationLogs: Array<{
  id: string
  type: 'save' | 'ignore' | 'send' | 'draft'
  status: 'pending' | 'completed' | 'failed'
  timestamp: string
  data: Record<string, unknown>
  message?: string
}> = []

// Track pending operations
const pendingOperations = new Map<string, { startTime: number }>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { operationType, data, operationId } = body

    // Validate required fields
    if (!operationType || !data) {
      return NextResponse.json(
        { error: 'operationType and data are required' },
        { status: 400 }
      )
    }

    // Valid operation types
    const validTypes = ['save', 'ignore', 'send', 'draft']
    if (!validTypes.includes(operationType)) {
      return NextResponse.json(
        { error: `Invalid operationType. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    const id = operationId || `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const timestamp = new Date().toISOString()

    // Log the operation
    const operation = {
      id,
      type: operationType as 'save' | 'ignore' | 'send' | 'draft',
      status: 'completed' as const,
      timestamp,
      data,
    }

    operationLogs.push(operation)
    pendingOperations.delete(id)

    console.log(`✅ Operation logged [${operationType}]:`, {
      id,
      timestamp,
      dataKeys: Object.keys(data),
    })

    return NextResponse.json(
      {
        success: true,
        operationId: id,
        message: `${operationType} operation completed successfully`,
        data: operation,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Operation logging error:', error)
    return NextResponse.json(
      { error: 'Failed to log operation' },
      { status: 500 }
    )
  }
}

// GET: Retrieve operation logs (for auditing)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '100')
    const type = searchParams.get('type')

    let logs = operationLogs

    // Filter by type if provided
    if (type) {
      logs = logs.filter((log) => log.type === type)
    }

    // Return most recent first, limited by count
    const recentLogs = logs.slice(-limit).reverse()

    return NextResponse.json(
      {
        success: true,
        count: recentLogs.length,
        total: operationLogs.length,
        logs: recentLogs,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Operation retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve operations' },
      { status: 500 }
    )
  }
}
