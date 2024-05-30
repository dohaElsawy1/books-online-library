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

//   ngOnInit(): void {
//     console.log("it works!");  // debug
//     // const authorKey = this.route.snapshot.paramMap.get('id');
//     // console.log(authorKey); // debug 
//     // if (authorKey) {
//     //   console.log('Fetching author details for key:', authorKey); // debug 
//     //   this.authorService.getAuthorDetails(authorKey).subscribe(
//     //     (author: Author) => {
//     //       console.log('Author details fetched:', author); // debug 
//     //       this.author = {
//     //         key:author.key,
//     //         name: author.name,
//     //         birth_date: author.birth_date,
//     //         work_count: author.work_count,
//     //         top_subjects: author.top_subjects.slice(0, 5), // Ensure only top 5 subjects
//     //         photos: author.photos ? author.photos : []
//     //       };
//     //     },
//     //     (error: any) => {
//     //       console.error('Error fetching author details:', error);
//     //     }
//     //   );
//     // } else {
//     //   console.error('Author key is null or undefined');
//     // }
// //////////////////// working with the one below
//       console.log("AuthordetailsComponent initialized");  // debug
//       const authorKey = this.route.snapshot.paramMap.get('id');
//       console.log('Author key from route:', authorKey); // debug 
//       if (authorKey) {
//         console.log('Fetching author details for key:', authorKey); // debug 
//         this.authorService.getAuthorDetails(authorKey).subscribe(
//           (author: Author) => {
//             console.log('Author details fetched:', author); // debug 
//             this.author = {
//               key: author.key,
//               name: author.name,
//               birth_date: author.birth_date,
//               work_count: author.work_count,
//               top_subjects: author.top_subjects,
//               // .slice(0, 5), // Ensure only top 5 subjects
//               photos: author.photos ? author.photos : []
//             };
//           },
//           (error: any) => {
//             console.error('Error fetching author details:', error);
//           }
//         );
//       } else {
//         console.error('Author key is null or undefined');
//       }

 
//     }
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
        birth_date: author.birth_date || 'None', // Default to 'None' if birth_date is missing
        // top_subjects: author.top_subjects ? author.top_subjects.slice(0, 5) : [] // Check if top_subjects is defined
        top_subjects: []
        
      };
      // .slice(0, 5); // Extract the first five subjects
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
      // console.log('Fetched work count:', this.workCount); // Debugging line
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
        // Assign fetched subjects to top_subjects array
        this.author.top_subjects = subjects; // Limit to the first five subjects
        console.log('query')
      }
    },
    error: (error: any) => {
      console.error('Error fetching author subjects:', error);
    }
  });
}
}




 
