import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

//constant goal data which has the goal name, hexadecimal color, and the url for the svg file
const goalData = [
  { name: 'No Poverty', color: '#db0404', image: new URL ("../lib/svg/Sustainable_Development_Goal_01NoPoverty.svg", import.meta.url).href},
  { name: 'Zero Hunger', color: '#dda63a', image: new URL ("../lib/svg/Sustainable_Development_Goal_02ZeroHunger.svg", import.meta.url).href},
  { name: 'Good Health and Well-being', color: '#4c9f38',image: new URL ("../lib/svg/Sustainable_Development_Goal_03GoodHealth.svg", import.meta.url).href },
  { name: 'Quality Education', color: '#c5192d',image: new URL ("../lib/svg/Sustainable_Development_Goal_04QualityEducation.svg", import.meta.url).href },
  { name: 'Gender Equality', color: '#ff3a21', image: new URL ("../lib/svg/Sustainable_Development_Goal_05GenderEquality.svg", import.meta.url).href},
  { name: 'Clean Water and Sanitation', color: '#26bde2',image: new URL ("../lib/svg/Sustainable_Development_Goal_06CleanWaterSanitation.svg", import.meta.url).href },
  { name: 'Affordable and Clean Energy', color: '#fcc30b', image: new URL ("../lib/svg/Sustainable_Development_Goal_07CleanEnergy.svg", import.meta.url).href},
  { name: 'Decent Work and Economic Growth', color: '#a21942', image: new URL ("../lib/svg/Sustainable_Development_Goal_08DecentWork.svg", import.meta.url).href},
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925',image: new URL ("../lib/svg/Sustainable_Development_Goal_09Industry.svg", import.meta.url).href },
  { name: 'Reduced Inequalities', color: '#dd1367', image: new URL ("../lib/svg/Sustainable_Development_Goal_10ReducedInequalities.svg", import.meta.url).href},
  { name: 'Sustainable Cities and Communities', color: '#fd9d24', image: new URL ("../lib/svg/Sustainable_Development_Goal_11SustainableCities.svg", import.meta.url).href},
  { name: 'Responsible Consumption and Production', color: '#bf8b2e', image: new URL ("../lib/svg/Sustainable_Development_Goal_12ResponsibleConsumption.svg", import.meta.url).href},
  { name: 'Climate Action', color: '#3f7e44', image: new URL ("../lib/svg/Sustainable_Development_Goal_13Climate.svg", import.meta.url).href},
  { name: 'Life Below Water', color: '#0a97d9', image: new URL ("../lib/svg/Sustainable_Development_Goal_14LifeBelowWater.svg", import.meta.url).href},
  { name: 'Life on Land', color: '#56c02b', image: new URL ("../lib/svg/Sustainable_Development_Goal_15LifeOnLand.svg", import.meta.url).href},
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d',image: new URL ("../lib/svg/Sustainable_Development_Goal_16PeaceJusticeInstitutions.svg", import.meta.url).href },
  { name: 'Partnerships for the Goals', color: '#19486a',image: new URL ("../lib/svg/Sustainable_Development_Goal_17Partnerships.svg", import.meta.url).href },
];

export class UnSdg extends DDDSuper(LitElement) {
  //sets the default parameters. This also desides what the first button changeable card starts as. 
  constructor() {
    super();
    this.goal = 3;
    this.name = "No Poverty";
    this.image = new URL("../lib/svg/Sustainable_Development_Goal_01NoPoverty.svg", import.meta.url).href;
    this.width = 254;
    this.colorOnly = false;
    this.loading = "lazy";
    this.fetchPriority = "low";
  }

 //gets the properites that can be changed. What goal to get, if it is color only, and updating the width
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      name: { type: String },
      image: { type: String },
      width: { type: Number, reflect: true },
      colorOnly: { type: Boolean, attribute: "color-only", reflect: true },
      loading: { type: String, reflect: true },
      fetchPriority: {
        type: String,
        attribute: "fetch-priority",
        reflect: true,
      },
    };
  }

  // when goal is updated the image is also updated. 
  updated(changedProperties) {
    if (changedProperties.has("goal")) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    // checking if the goal is all or circle then setting the image to what svg to grab.
    if (this.goal === "all" || this.goal === "circle") {
      this.image = new URL(  `../lib/svg/Sustainable_Development_Goal_${this.goal}.svg`, import.meta.url ).href;
    } else {
      // checking if goal is a number between 1 and 17 then setting the image source
      const goal = parseInt(this.goal);
      if (goal >= 1 && goal <= 17) {
        // since the file names are the same up until the goal I can just call the generic file and then goal. This makes it easier because it updates with each goal.
        this.image = new URL(`../lib/svg/Sustainable_Development_Goal_${goal}.svg`, import.meta.url).href;
        // setting alt text to the goal so that you don't have to remember it. 
        this.name = `Goal ${goal}: ${goalData[goal - 1].name}`;
      }
    }
  }

  static get styles() {
    return css`
      :host {
        // css variables with hexadecimal color values of each svg. These are used for the color-less section
        --un-sdg-goal-1: #db0404;
        --un-sdg-goal-2: #dda63a;
        --un-sdg-goal-3: #4c9f38;
        --un-sdg-goal-4: #c5192d;
        --un-sdg-goal-5: #ff3a21;
        --un-sdg-goal-6: #26bde2;
        --un-sdg-goal-7: #fcc30b;
        --un-sdg-goal-8: #a21942;
        --un-sdg-goal-9: #fd6925;
        --un-sdg-goal-10: #dd1367;
        --un-sdg-goal-11: #fd9d24;
        --un-sdg-goal-12: #bf8b2e;
        --un-sdg-goal-13: #3f7e44;
        --un-sdg-goal-14: #0a97d9;
        --un-sdg-goal-15: #56c02b;
        --un-sdg-goal-16: #00689d;
        --un-sdg-goal-17: #19486a;

        display: inline-block;
      }
    `;
  }

  render() {
    //This checks if the image is supposed to be all or circle. If it is then it sets up the width and image. This is also where the lazy loading and fetch priority are used. 
    if (this.goal === "all" || this.goal === "circle") {
      this.image = new URL(
        `../lib/svg/Sustainable_Development_Goals_${this.goal}.svg`,
        import.meta.url
      ).href;
      return html` <img
        src="${this.image}"
        alt="${this.name}"
        style="width: ${this.width}px;"
        loading="${this.loading === "eager" || this.loading === "lazy"
          ? this.loading
          : "lazy"}"
        fetchPriority="${this.fetchPriority}"
      />`;
    }
    // sets up a color card if colorOnly is true
    if (this.colorOnly) {
      // this converts the string text to an integer. This lets the goal number get tested to set the color. 
      const goal = parseInt(this.goal);
      // checks if the goal is set between 1 and 17 then setting the color card with the background color based on the goal.
      if (goal >= 1 && goal <= 17) {
        const color = goalData[goal - 1].color;
        const width = this.width;
        //finishes setting up the card and makes all the parameters uniform so that they are displayed the same way
        return html`<div
          style="background-color: ${color};width: ${width}px;height: ${width}px;"
        ></div>`;
      }
    }

    // if goal is not "all" or "circle" and color-only attribute is not set to true then rendering the image with src and alt properties, setting width based on the width property, default 254px
    return html` <img
      src="${this.image}"
      alt="${this.name}"
      style="width: ${this.width}px;"
      loading="${this.loading === "eager" || this.loading === "lazy"
        ? this.loading
        : "lazy"}"
      fetchPriority="${this.fetchPriority}"
    />`;
  }
  //gets hax properties
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define("un-sdg", UnSdg);