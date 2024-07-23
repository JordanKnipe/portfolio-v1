import { Component, OnInit } from '@angular/core';
import { TextContainerComponent } from '../../components/text-container/text-container.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TextContainerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
aboutMeTitle: string = "About Me";
programmingTitle: string = "Programming";
hobbiesTitle: string = "Hobbies";
goalsTitle: string = "Goals";
aboutMeText: string = "I am an Accomplished, detail-focused and creative Service Professional passionate in Computer Science. I have Quantifiable knowledge and experience in IT, software development and Game Development. I have a Creative and flexible approach towards problem solving with the ability to communicate effectively. I Build strong and positive relationships with clients and co-workers.";
programmingText: string = "I have honed my skills in full-stack cloud development. My primary tech-stack involves Angular, AWS Lambda using Golang, Python or Nodejs , Rxjs and API Gateway, DynamoDB NoSQL, SQL, S3 and Cloudfront. \n Although this is my prefered tech-stack I have a wide range of experience with multiple technologies which are, but not limited to: Unity C#, Golang, ReactJS, Wordpress, Azure Cloud, MySQL, R, NoSQL";
goalText: string = "My career goals are full-stack development oriented, I enjoy building applications from start to finish, and being apart of the entire development process from front-end, back-end, design and deployment. I aspire to continuously learn, while tackling difficult topics.";
hobbyText: string = "For my hobbies I enjoy tackling difficult technical topics, for example my current topics include: procedural animation, physics simulation and Geospatial Data. I enjoy spending time in nature, hiking, gardening and learning self-sustainable skills. My hobbies reflect in my personal projects by developing gardening applications using geospatial data, and creating video-games to implement procedural and physics based movement.";

constructor() {
  }
  ngOnInit(): void {
      
  }

}
