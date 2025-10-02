"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Sparkles } from "lucide-react"
import Image from "next/image"

type Position = {
  row: number
  col: number
}

export function EightQueensGame() {
  const [queens, setQueens] = useState<Position[]>([])
  const [conflicts, setConflicts] = useState<Set<string>>(new Set())
  const [isSolved, setIsSolved] = useState(false)

  const isConflicting = useCallback((pos1: Position, pos2: Position): boolean => {
    return (
      pos1.row === pos2.row || pos1.col === pos2.col || Math.abs(pos1.row - pos2.row) === Math.abs(pos1.col - pos2.col)
    )
  }, [])

  const updateConflicts = useCallback(
    (newQueens: Position[]) => {
      const newConflicts = new Set<string>()

      for (let i = 0; i < newQueens.length; i++) {
        for (let j = i + 1; j < newQueens.length; j++) {
          if (isConflicting(newQueens[i], newQueens[j])) {
            newConflicts.add(`${newQueens[i].row}-${newQueens[i].col}`)
            newConflicts.add(`${newQueens[j].row}-${newQueens[j].col}`)
          }
        }
      }

      setConflicts(newConflicts)
      setIsSolved(newQueens.length === 8 && newConflicts.size === 0)
    },
    [isConflicting],
  )

  const handleSquareClick = useCallback(
    (row: number, col: number) => {
      const positionKey = `${row}-${col}`
      const existingQueenIndex = queens.findIndex((q) => q.row === row && q.col === col)

      let newQueens: Position[]

      if (existingQueenIndex !== -1) {
        // Remove queen
        newQueens = queens.filter((_, index) => index !== existingQueenIndex)
      } else {
        // Add queen (limit to 8)
        if (queens.length < 8) {
          newQueens = [...queens, { row, col }]
        } else {
          return
        }
      }

      setQueens(newQueens)
      updateConflicts(newQueens)
    },
    [queens, updateConflicts],
  )

  const resetGame = useCallback(() => {
    setQueens([])
    setConflicts(new Set())
    setIsSolved(false)
  }, [])

  const solveAutomatically = useCallback(() => {
    // One of the 92 solutions to the 8-queens problem
    const solution: Position[] = [
      { row: 0, col: 0 },
      { row: 1, col: 4 },
      { row: 2, col: 7 },
      { row: 3, col: 5 },
      { row: 4, col: 2 },
      { row: 5, col: 6 },
      { row: 6, col: 1 },
      { row: 7, col: 3 },
    ]

    setQueens(solution)
    updateConflicts(solution)
  }, [updateConflicts])

  const renderSquare = (row: number, col: number) => {
    const isLight = (row + col) % 2 === 0
    const hasQueen = queens.some((q) => q.row === row && q.col === col)
    const isConflicted = conflicts.has(`${row}-${col}`)

    return (
      <button
        key={`${row}-${col}`}
        onClick={() => handleSquareClick(row, col)}
        className={`
          aspect-square flex items-center justify-center text-2xl font-bold transition-all duration-200 hover:scale-105 border border-border/20
          ${isLight ? "bg-pink-100" : "bg-pink-900"}
          ${hasQueen && "border-accent"}
          ${!hasQueen ? "hover:bg-primary/10" : ""}
        `}
      >
        {hasQueen && (
          <Image 
            src="/queen.png" 
            alt="Queen" 
            width={40} 
            height={40} 
            className={`w-12 h-12`}
          />
        )}
      </button>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 text-balance text-white drop-shadow-lg">8 Queens Puzzle</h1>
        <p className="text-white/80 text-lg text-pretty drop-shadow-md">
          Place 8 queens on the chessboard so that none can attack each other
        </p>
        </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Game Board */}
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-8 gap-0 border-2 border-border rounded-lg overflow-hidden mx-auto max-w-md">
              {Array.from({ length: 8 }, (_, row) => Array.from({ length: 8 }, (_, col) => renderSquare(row, col)))}
            </div>
          </CardContent>
        </Card>

        {/* Game Info */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                                                    <Image 
                      src="/sparkles.png" 
                      alt="Sparkles" 
                      width={20} 
                      height={20} 
                      className="w-4 h-4"
                    />
                Game Status
              </CardTitle>
              <CardDescription>Track your progress and game state</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Queens Placed:</span>
                <Badge variant={queens.length === 8 ? "default" : "secondary"}>{queens.length}/8</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conflicts:</span>
                <Badge variant={conflicts.size > 0 ? "destructive" : "default"}>{conflicts.size}</Badge>
              </div>

              {isSolved && (
                <div className="p-4 bg-accent/10 border border-accent rounded-lg">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Image 
                      src="/queen.png" 
                      alt="Queen" 
                      width={20} 
                      height={20} 
                      className="w-5 h-5 drop-shadow-[0_0_4px_rgb(249,179,87)]"
                    />
                    Puzzle Solved!
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Congratulations! You've successfully placed all 8 queens.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Game Controls</CardTitle>
              <CardDescription>Manage your game and get help</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={resetGame} variant="outline" className="w-full bg-transparent">
                    <Image 
                      src="/rotate.png" 
                      alt="Rotate" 
                      width={20} 
                      height={20} 
                      className="w-3 h-3"
                    />
                Reset Game
              </Button>

              <Button onClick={solveAutomatically} variant="secondary" className="w-full">
                                    <Image 
                      src="/sparkles.png" 
                      alt="Sparkles" 
                      width={20} 
                      height={20} 
                      className="w-4 h-4"
                    />
                Show Solution
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>How to Play</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Click on any square to place or remove a queen</p>
              <p>• Queens attack horizontally, vertically, and diagonally</p>
              <p>• Red queens indicate conflicts that need to be resolved</p>
              <p>• Green queens are safely placed with no conflicts</p>
              <p>• Solve the puzzle by placing all 8 queens safely</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
