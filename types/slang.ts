export interface SlangTerm {
    id: string;
    term: string;
    meaning: string;
    category: string;
    example: string;
    tags: string[];
    likes: number;
    visits: number;
    comments: Comment[];
  }
  
  export interface Comment {
    user: string;
    comment: string;
  }
  
  export interface TopVisitedSlang {
    id: string;
    term: string;
    meaning: string;
    visits: number;
  }
  
  