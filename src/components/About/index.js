import React, { Component } from 'react'
import {Grid, Cell, Card, CardTitle, CardText, Tabs, Tab} from 'react-mdl';
import './about.css';
import {Chart} from 'chart.js';
const svgStyle={
  position:'absolute',
  top:'-9999px'
}
export class About extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activeTab:0,
      activeSkillTab:0
    }
    this.labels=[
      'Javascript',
      'HTML',
      'CSS',
      'Aurelia',
      'Angular',
      'React',
      'Node',
      'Express',
      'PHP'
    ]

    this.values=[
      95,90,90,100,80,60,85,80,70
    ]
    this.skills=[
      {
        name:'Javascript',
        skills:[
          {
            name:'Javascript',
            value:95,
            description:'An expert on vanilla JavaScript, ES6, AJAX, jQuery, gulp, and grunt. Currently having fun playing around with the Web Audio API and Web GL. I love to explore using JavaScript in other places besides the web, such as React Native and Raspberry Pis. Ever flown a drone running on NodeJS?'
          },
          {
            name:'Aurelia',
            value:100,
            description:'Aurelia is the front end framework I\'m most experienced in, and my personal favorite after three years of use. This site is built using it. For those who haven\'t heard of it, Aurelia is a MVC framework very similar to Angular.',
          },
          {
            name:'Angular',
            value:80,
            description:'I have around 2.5 years of experience with angular 1.5 and am familar with angular 2.'
          },
          {
            name:'React',
            value:60,
            description:'I only started using react about 6 months ago, but I think its a great framework and am very excited about react native.'
          },
        ]
      },
      {
        name:'Html/CSS',
        skills:[
          {
            name:'HTML',
            value:90,
            description:'Its HTML, what else can you say?'
          },
          {
            name:'CSS',
            value:90,
            description:'5 years of designing responsive web apps using bootstrap as well as CSS preprocessors such as Sass.'
          },
          {
            name:'Bootstrap',
            value:90,
            description:'The OG CSS framework'
          },
          {
            name:'Materialize-css',
            value:80,
            description:'I loved Materialize-css until I discovered Material-design-lite'
          },
          {
            name:'Material-design-lite',
            value:70,
            description:'Im new to this framework, but so far it\'s my favorite over bootstrap and the others. This site is using Material-design-lite'
          }
        ]
      },
      {
        name:'Backend',
        skills:[
          {
            name:'Node',
            value:85,
            description:'My favorite way to write REST APIs, and do any kind of backend work in general. Also exploring Node Js powered drones and and electron apps'
          },
          {
            name:'Express',
            value:80,
            description:'Express is the Node server framework I have the most experience with. Also included here are Mongoose and socket.io'
          },
          {
            name:'PHP',
            value:70,
            description:'I have five years of experience using php, from porting an old php website over to a REST api then later porting it to Node and Express. I have to say though, people should really stop using PHP...'
          }
        ]
      }
    ]
    this.activeSkill=this.skills[0];

    this.skillIndex=0;
    this.colors=[
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(255, 159, 64, 1)'
    ]
  }

  componentDidMount(){
    var ctx = document.getElementById("skills-container");
    ctx.width=200;
    ctx.height=200;
    var datasets=[];
    for(var i=0; i<this.activeSkill.skills.length;i++){
      datasets.push({
        label:this.activeSkill.skills[i].name,
        data:[this.activeSkill.skills[i].value],
        backgroundColor:this.colors[i]
      });
    }
    Chart.defaults.global.defaultFontColor='#fff';
    Chart.defaults.global.defaultFontFamily='sans-serif';
    Chart.defaults.global.defaultFontSize=18;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Skills'],
        datasets: datasets
      },
      options: {
        borderColor:'#fff',
        scaleFontColor:'#fff',
        legend: {
          strokeStyle:'#fff',
            display: true,
            labels: {
                fontColor: 'rgb(255,255,255)'
            }
        },
        responsive:true,
        maintainAspectRatio:false,
        scales: {
          xAxes:[{
            gridlines:{
              color:'#fff',
              display:false
            }
          }],
            yAxes: [{
              gridlines:{
                color:'#fff',
                display:false
              },
                ticks: {
                    beginAtZero:true,
                    min: 0,
                    max: 100,
                    fontColor:'#fff',
                    color:'#fff'
                }
              }]
           }
        }
    });
  }
  render(){
    return(
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="56" height="100" style={svgStyle} id="cubesvg">
          <rect width="56" height="100" fill="#2196f3"/>
          <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#00E676" strokeWidth="2"/>
          <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="#00E676" strokeWidth="2"/>
        </svg>
        <Grid>
          <Cell col={12}>
            <Card shadow={0} style={{ margin: 'auto', width:'100%'}}>
              <CardTitle className='topimg'>
                <div className="text-center" style={{margin:"0 auto", color:"#fff"}}>
                    <h1 style={{marginBottom:"5px"}}>All Things Front End</h1>
                    <p style={{marginTop:"5px"}}>(And More)</p>
                    <h4 style={{marginBottom:"5px"}}>Hey, I'm Justin, a Front End Developer.</h4>
                    <h4 style={{marginBottom:"10px"}}>And this is my website about making websites.</h4>
                </div>
              </CardTitle>
            </Card>
          </Cell>
          <Cell col={12}>
            <Card shadow={0} style={{ margin: 'auto', width:'100%'}}>
              <CardTitle className='who-am-i'>
                Who am I?
              </CardTitle>
              <CardText>
                I'm a front end developer at AlterMedia, where we make the worlds leading Studio Management Software. I studied computer science at College of the Canyons.
                <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                    <Tab>Experience</Tab>
                    <Tab>Education</Tab>
                </Tabs>
                <section>
                    {
                      this.state.activeTab===0?
                        <Grid>
                          <Cell col={6} className="text-center">
                            <h5 className="text-center">WebGlancer</h5>
                            In the last 5 years at AlterMedia, I've converted the front end of a jQuery/PHP system back from the old days of web development over to Angular 1.5 and created a REST api for it in PHP.
                             Later, around the time Angular 2 came out, we decided to switch the front end to Aurelia instead and are very happy with it. I am now finishing up migrating the backend over to Node and Express.
                             I also designed much of the interface and maintained multiple versions of the product.
                          </Cell>
                          <Cell col={6} className="text-center">
                            <h5 className="text-center">WordPress</h5>
                            I maintain the companies website at &nbsp;<a href="https://studiosuite.com">studiosuite.com</a>
                          </Cell>
                        </Grid>
                      :
                      <Grid>
                        <Cell col={6} className="text-center">
                          <h5 className="text-center">College of the Canyons</h5>
                          I've finished computer science at College of the Canyons, but I have a few math classes to take before I can transfer.
                        </Cell>
                        <Cell col={6} className="text-center">
                          <h5 className="text-center">ACM Club</h5>
                          Founding member of an ACM club chaper at COC
                        </Cell>
                      </Grid>

                    }
                </section>
              </CardText>
            </Card>
          </Cell>
          <Cell col={12}>
            <Card shadow={0} style={{ margin: 'auto', width:'100%'}}>
              <CardTitle className='skills'>
                <canvas id="skills-container"  width="200" height="200"></canvas>
              </CardTitle>
              <CardText>
                I'm a front end developer at AlterMedia, where we make the worlds leading Studio Management Software. I studied computer science at College of the Canyons.
                <Tabs activeTab={this.state.activeSkillTab} onChange={(tabId) => {
                    this.setState({ activeSkillTab: tabId });
                    var datasets=[];
                    var arr=this.skills[tabId].skills;
                    for(var i=0; i<arr.length;i++){
                      datasets.push({
                        label:arr[i].name,
                        data:[arr[i].value],
                        backgroundColor:this.colors[i]
                      });
                    }
                    this.chart.data.datasets=datasets;
                    this.chart.update();
                  }} ripple>
                    {
                      this.skills.map((skill, index)=>{
                        return(
                          <Tab key={index}>{skill.name}</Tab>
                        )
                      })
                    }
                </Tabs>
                <section>
                    {
                      <Grid>
                        {
                          this.skills[this.state.activeSkillTab].skills.map((skill, index)=>{
                            return (
                              <Cell col={6} key={index} className="text-left">
                                <h5>{skill.name}</h5>
                                <p>{skill.description}</p>
                              </Cell>
                            )
                          })
                      }
                      </Grid>

                    }
                </section>
              </CardText>
            </Card>
          </Cell>
        </Grid>
      </div>
    )
  }
}
