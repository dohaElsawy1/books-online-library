import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/models/iauthor';
import { AuthorService } from 'src/app/services/author/author.service';

@Component({
  selector: 'app-authordetails',
  templateUrl: './authordetails.component.html',
  styleUrls: ['./authordetails.component.css']
})
export class AuthordetailsComponent implements OnInit {
  author: Author | undefined;
  topFiveSubjects: string[] = [];
  workCount: number = 0;
  constructor(private route: ActivatedRoute, private authorService: AuthorService) { }


ngOnInit(): void {
  const authorKey = this.route.snapshot.paramMap.get('id');
  if (authorKey) {
    console.log('Fetching details and works for author key:', authorKey); // debug 
    this.fetchAuthorDetails(authorKey);
    this.fetchAuthorWorks(authorKey);
  } else {
    console.error('Author key is null or undefined');
  }
}

fetchAuthorDetails(authorKey: string): void {
  // console.log('Inside fetchAuthorDetails with key:', authorKey); // debug 
  this.authorService.getAuthorDetails(authorKey).subscribe({
    next: (author: Author) => {
      // console.log('Author details fetched:', author); // debug
      this.author = {
        ...author,
        birth_date: author.birth_date || 'None', 
        // top_subjects: author.top_subjects ? author.top_subjects.slice(0, 5) : [] 
        top_subjects: []
        
      };
      // .slice(0, 5); 
    },
    error: (error: any) => {
      console.error('Error fetching author details:', error);
    }
  });
}

fetchAuthorWorks(authorKey: string): void {
  // console.log('Inside fetchAuthorWorks with key:', authorKey); // debug 
  this.authorService.getAuthorWorksCount(authorKey).subscribe({
    next: (count: number) => {
      // console.log('Fetched work count:', count); // debug
      this.workCount = count;
      // console.log('Fetched work count:', this.workCount); // debug
    },
    error: (error: any) => {
      console.error('Error fetching author works:', error);
    }
  });
}

fetchAuthorSubjects(authorName: string): void {
  this.authorService.getAuthorSubjects(authorName).subscribe({
    next: (subjects: string[]) => {
      if (this.author) {
        
        this.author.top_subjects = subjects; 
        console.log('query')
      }
    },
    error: (error: any) => {
      console.error('Error fetching author subjects:', error);
    }
  });
}
}




 
