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

  constructor(private route: ActivatedRoute, private authorService: AuthorService) { }

  ngOnInit(): void {
    console.log("it works!");  // debug
    // const authorKey = this.route.snapshot.paramMap.get('id');
    // console.log(authorKey); // debug 
    // if (authorKey) {
    //   console.log('Fetching author details for key:', authorKey); // debug 
    //   this.authorService.getAuthorDetails(authorKey).subscribe(
    //     (author: Author) => {
    //       console.log('Author details fetched:', author); // debug 
    //       this.author = {
    //         key:author.key,
    //         name: author.name,
    //         birth_date: author.birth_date,
    //         work_count: author.work_count,
    //         top_subjects: author.top_subjects.slice(0, 5), // Ensure only top 5 subjects
    //         photos: author.photos ? author.photos : []
    //       };
    //     },
    //     (error: any) => {
    //       console.error('Error fetching author details:', error);
    //     }
    //   );
    // } else {
    //   console.error('Author key is null or undefined');
    // }
//////////////////// working with the one below
      console.log("AuthordetailsComponent initialized");  // debug
      const authorKey = this.route.snapshot.paramMap.get('id');
      console.log('Author key from route:', authorKey); // debug 
      if (authorKey) {
        console.log('Fetching author details for key:', authorKey); // debug 
        this.authorService.getAuthorDetails(authorKey).subscribe(
          (author: Author) => {
            console.log('Author details fetched:', author); // debug 
            this.author = {
              key: author.key,
              name: author.name,
              birth_date: author.birth_date,
              work_count: author.work_count,
              top_subjects: author.top_subjects.slice(0, 5), // Ensure only top 5 subjects
              photos: author.photos ? author.photos : []
            };
          },
          (error: any) => {
            console.error('Error fetching author details:', error);
          }
        );
      } else {
        console.error('Author key is null or undefined');
      }

 
    }

  }





 
