import type { PatternId, PatternPosition, ViolinString } from "~/common/patterns";

export default function generateQuiz(quizSettings: QuizSettings): QuestionInfo[] {
  const questionPool: QuestionInfo[] = allPossibleQuestions.filter(
    (q) =>
      quizSettings.strings.includes(q.violinString) &&
      quizSettings.patterns.includes(q.patternId) &&
      q.difficulty <= quizSettings.difficulty,
  );
  const selectedQuestions = [];
  for (let i = 0; i < quizSettings.numOfQuestions; i++) {
    const randomIndex = Math.floor(Math.random() * questionPool.length);
    const question = questionPool[randomIndex];
    if (!question) {
      continue;
    }
    selectedQuestions.push(question);
  }
  return selectedQuestions;
}
export enum QuizMode {
  Splash,
  Setup,
  Results,
  Taking,
}

export type QuizSettings = {
  numOfQuestions: number;
  strings: ViolinString[];
  patterns: PatternId[];
  inOrder: boolean;
  difficulty: number;
};

export type QuestionInfo = {
  notes: string;
  patternId: PatternId;
  violinString: ViolinString;
  patternPosition: PatternPosition;
  difficulty: number;
};

export type QuizResultsInfo = {
  correct: number;
  incorrect: number;
  missed: {
    violinString: {
      E: number;
      A: number;
      D: number;
      G: number;
    };
    patternId: {
      oneTwo: number;
      twoThree: number;
      threeFour: number;
      wholeSteps: number;
      halfSteps: number;
    };
    patternPosition: {
      low: number;
      normal: number;
      high: number;
    };
  };
};

export const quizDefaults: QuizSettings = {
  numOfQuestions: 10,
  strings: ["E", "A", "D", "G"],
  patterns: ["oneTwo", "twoThree", "threeFour", "wholeSteps", "halfSteps"],
  inOrder: true,
  difficulty: 3,
};

export const quizResultsBlank: QuizResultsInfo = {
  correct: 0,
  incorrect: 0,
  missed: {
    violinString: {
      E: 0,
      A: 0,
      D: 0,
      G: 0,
    },
    patternId: {
      oneTwo: 0,
      twoThree: 0,
      threeFour: 0,
      wholeSteps: 0,
      halfSteps: 0,
    },
    patternPosition: {
      low: 0,
      normal: 0,
      high: 0,
    },
  },
};

export const allPossibleQuestions: QuestionInfo[] = [
  // G String
  {
    notes: "_A, __B, _C _D",
    violinString: "G",
    patternId: "oneTwo",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "A, _B, C D",
    violinString: "G",
    patternId: "oneTwo",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^A, B, ^C ^D",
    violinString: "G",
    patternId: "oneTwo",
    patternPosition: "high",
    difficulty: 3,
  },
  {
    notes: "_A, _B, _C _D",
    violinString: "G",
    patternId: "twoThree",
    patternPosition: "low",
    difficulty: 4,
  },
  {
    notes: "A, B, C D",
    violinString: "G",
    patternId: "twoThree",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^A, ^B, ^C ^D",
    violinString: "G",
    patternId: "twoThree",
    patternPosition: "high",
    difficulty: 4,
  },
  {
    notes: "_A, _B, C _D",
    violinString: "G",
    patternId: "threeFour",
    patternPosition: "low",
    difficulty: 2,
  },
  {
    notes: "A, B, ^C D",
    violinString: "G",
    patternId: "threeFour",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^A, ^B, ^^C ^D",
    violinString: "G",
    patternId: "threeFour",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_A, _B, C D",
    violinString: "G",
    patternId: "wholeSteps",
    patternPosition: "low",
    difficulty: 2,
  },
  {
    notes: "A, B, ^C ^D",
    violinString: "G",
    patternId: "wholeSteps",
    patternPosition: "normal",
    difficulty: 3,
  },
  {
    notes: "^A, ^B, ^^C ^^D",
    violinString: "G",
    patternId: "wholeSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_A, __B, C _D",
    violinString: "G",
    patternId: "halfSteps",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "A, _B, ^C D",
    violinString: "G",
    patternId: "halfSteps",
    patternPosition: "normal",
    difficulty: 3,
  },
  {
    notes: "^A, B, ^^C ^D",
    violinString: "G",
    patternId: "halfSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  // D String
  {
    notes: "_E _F _G _A",
    violinString: "D",
    patternId: "oneTwo",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "E F G A",
    violinString: "D",
    patternId: "oneTwo",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^E ^F ^G ^A",
    violinString: "D",
    patternId: "oneTwo",
    patternPosition: "high",
    difficulty: 4,
  },
  {
    notes: "_E F _G _A",
    violinString: "D",
    patternId: "twoThree",
    patternPosition: "low",
    difficulty: 3,
  },
  {
    notes: "E ^F G A",
    violinString: "D",
    patternId: "twoThree",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^E ^^F ^G ^A",
    violinString: "D",
    patternId: "twoThree",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_E F G _A",
    violinString: "D",
    patternId: "threeFour",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "E ^F ^G A",
    violinString: "D",
    patternId: "threeFour",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^E ^^F ^^G ^A",
    violinString: "D",
    patternId: "threeFour",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_E F G A",
    violinString: "D",
    patternId: "wholeSteps",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "E ^F ^G ^A",
    violinString: "D",
    patternId: "wholeSteps",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^E ^^F ^^G ^^A",
    violinString: "D",
    patternId: "wholeSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_E _F G _A",
    violinString: "D",
    patternId: "halfSteps",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "E F ^G A",
    violinString: "D",
    patternId: "halfSteps",
    patternPosition: "normal",
    difficulty: 3,
  },
  {
    notes: "^E ^F ^^G ^A",
    violinString: "D",
    patternId: "halfSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  // A String
  {
    notes: "_B _c _d _e",
    violinString: "A",
    patternId: "oneTwo",
    patternPosition: "low",
    difficulty: 4,
  },
  {
    notes: "B c d e",
    violinString: "A",
    patternId: "oneTwo",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^B ^c ^d ^e",
    violinString: "A",
    patternId: "oneTwo",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_B c _d _e",
    violinString: "A",
    patternId: "twoThree",
    patternPosition: "low",
    difficulty: 2,
  },
  {
    notes: "B ^c d e",
    violinString: "A",
    patternId: "twoThree",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^B ^^c ^d ^e",
    violinString: "A",
    patternId: "twoThree",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_B c d _e",
    violinString: "A",
    patternId: "threeFour",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "B ^c ^d e",
    violinString: "A",
    patternId: "threeFour",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^B ^^c ^^d ^e",
    violinString: "A",
    patternId: "threeFour",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_B c d e",
    violinString: "A",
    patternId: "wholeSteps",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "B ^c ^d ^e",
    violinString: "A",
    patternId: "wholeSteps",
    patternPosition: "normal",
    difficulty: 3,
  },
  {
    notes: "^B ^^c ^^d ^^e",
    violinString: "A",
    patternId: "wholeSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "_B _c d _e",
    violinString: "A",
    patternId: "halfSteps",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "B c ^d e",
    violinString: "A",
    patternId: "halfSteps",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^B ^c ^^d ^e",
    violinString: "A",
    patternId: "halfSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  // E String
  {
    notes: "f _g _a _b",
    violinString: "E",
    patternId: "oneTwo",
    patternPosition: "low",
    difficulty: 4,
  },
  {
    notes: "^f g a b",
    violinString: "E",
    patternId: "oneTwo",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^^f ^g ^a ^b",
    violinString: "E",
    patternId: "oneTwo",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "f g _a _b",
    violinString: "E",
    patternId: "twoThree",
    patternPosition: "low",
    difficulty: 2,
  },
  {
    notes: "^f ^g a b",
    violinString: "E",
    patternId: "twoThree",
    patternPosition: "normal",
    difficulty: 1,
  },
  {
    notes: "^^f ^^g ^a ^b",
    violinString: "E",
    patternId: "twoThree",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "f g a _b",
    violinString: "E",
    patternId: "threeFour",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "^f ^g ^a b",
    violinString: "E",
    patternId: "threeFour",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^^f ^^g ^^a ^b",
    violinString: "E",
    patternId: "threeFour",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "f g a b",
    violinString: "E",
    patternId: "wholeSteps",
    patternPosition: "low",
    difficulty: 1,
  },
  {
    notes: "^f ^g ^a ^b",
    violinString: "E",
    patternId: "wholeSteps",
    patternPosition: "normal",
    difficulty: 3,
  },
  {
    notes: "^^f ^^g ^^a ^^b",
    violinString: "E",
    patternId: "wholeSteps",
    patternPosition: "high",
    difficulty: 5,
  },
  {
    notes: "f _g a _b",
    violinString: "E",
    patternId: "halfSteps",
    patternPosition: "low",
    difficulty: 5,
  },
  {
    notes: "^f g ^a b",
    violinString: "E",
    patternId: "halfSteps",
    patternPosition: "normal",
    difficulty: 2,
  },
  {
    notes: "^^f ^g ^^a ^b",
    violinString: "E",
    patternId: "halfSteps",
    patternPosition: "high",
    difficulty: 5,
  },
];
