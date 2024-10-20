import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";


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
  // default to goal 1
  constructor() {
    super();
    this.goal = 1;
    this.name = "No Poverty";
    this.image = new URL("../lib/svg/Sustainable_Development_Goal_01NoPoverty.svg", import.meta.url).href;
    this.width = 254;
    this.colorOnly = false;
    this.loading = "lazy";
    this.fetchPriority = "low";
  }

  // reflect goal, width, and colorOnly properties to attributes so they can be updated
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

  // when goal property is updated, update the image source
  updated(changedProperties) {
    if (changedProperties.has("goal")) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    // checking if goal is "all" or "circle" then setting the image source
    if (this.goal === "all" || this.goal === "circle") {
      this.image = new URL(
        `../lib/svg/${this.goal}.svg`,
        import.meta.url
      ).href;
      // setting alt text if the goal is "all" or "circle"
      this.name =
        this.goal === "all"
          ? "All Sustainable Development Goals"
          : "Sustainable Development Goals Circle";
    } else {
      // checking if goal is between 1 and 17 then setting the image source
      const goal = parseInt(this.goal);
      if (goal >= 1 && goal <= 17) {
        
        // filenames are "1.svg", "2.svg"... to make it easy to set the image source based on the goal number
        this.image = new URL(`../lib/svg/Sustainable_Development_Goal_${goal}.svg`, import.meta.url).href;
        // setting alt text based on the goal number
        this.name = `Goal ${goal}: ${goalData[goal - 1].name}`;
      }
    }
  }

  static get styles() {
    return css`
      :host {
        // css variables with hex values of each svg
        --un-sdg-goal-1: #d83534;
        --un-sdg-goal-2: #cba342;
        --un-sdg-goal-3: #4c9f38;
        --un-sdg-goal-4: #b32e36;
        --un-sdg-goal-5: #dd4d35;
        --un-sdg-goal-6: #4eacd5;
        --un-sdg-goal-7: #f3bb42;
        --un-sdg-goal-8: #842036;
        --un-sdg-goal-9: #e37537;
        --un-sdg-goal-10: #ce2f82;
        --un-sdg-goal-11: #eca342;
        --un-sdg-goal-12: #c7913e;
        --un-sdg-goal-13: #527742;
        --un-sdg-goal-14: #367cb7;
        --un-sdg-goal-15: #5fae55;
        --un-sdg-goal-16: #225387;
        --un-sdg-goal-17: #1b3264;

        display: inline-block;
      }
    `;
  }

  render() {
    // rendering image if goal is "all" or "circle" with src and alt properties, setting width based on the width property, default 254px
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

    // rendering color box if color-only attribute is set to true
    if (this.colorOnly) {
      // parseInt to convert string to number to get an index of the goal
      const goal = parseInt(this.goal);
      // checking if goal is between 1 and 17 then setting the color box with background color based on the goal number
      if (goal >= 1 && goal <= 17) {
        const color = goalData[goal - 1].color;
        const width = this.width;
        // setting background color based on goal number, width and height are the same so it is a square based on the width property
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
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define("un-sdg", UnSdg);