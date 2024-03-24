class Clock {
  constructor(image, counter, id) {
    this.image = image;
    this.counter = counter;
    this.id = id;
    this.section = this.createDetails();
  }

  createDetails() {
    const section = document.createElement("section");
    section.classList.add("clock");
    section.dataset.id = this.id;

    const image_holder = document.createElement("div");
    image_holder.classList.add("image-holder");
    section.appendChild(image_holder);

    const p = document.createElement("p");
    p.textContent = "Total Time Counters: " + this.counter;
    p.classList.add("basic_typo");
    section.appendChild(p);

    const img = document.createElement("img");
    img.src = this.image;
    img.classList.add("clock-image");
    image_holder.appendChild(img);

    const button01 = document.createElement("h3");
    button01.textContent = "Add Counter";
    button01.classList.add("basic_typo");
    section.appendChild(button01);

    button01.addEventListener("click", () => {
      this.counter++;
      this.updateCounter();
    });

    const button02 = document.createElement("h3");
    button02.textContent = "Remove Counter";
    button02.classList.add("basic_typo");
    section.appendChild(button02);

    button02.addEventListener("click", () => {
      if (this.counter > 0) {
        this.counter--;
        this.updateCounter();
      }
    });

    const button03 = document.createElement("h3");
    button03.textContent = "Remove Clock";
    button03.classList.add("basic_typo");
    button03.addEventListener("click", () => {
      this.removeClock();
    });
    section.appendChild(button03);

    return section;
  }

  updateCounter() {
    const p = this.section.querySelector("p.basic_typo");
    if (p) {
      p.textContent = "Total Time Counters: " + this.counter;
    }

    var num_ready = 0;

    totalClocks.forEach((clock) => {
      if (clock.counter >= 12) {
        num_ready++;
      }
    });

    document.getElementById("updater").textContent =
      "Ready Clocks: " + num_ready;
  }

  removeClock() {
    const index = totalClocks.findIndex((clock) => clock.id === this.id);
    if (index !== -1) {
      totalClocks.splice(index, 1);
      this.section.remove();
    }
  }

  get details() {
    this.updateCounter();
    return this.section;
  }
}

const totalClocks = [];
let clockID = 0;

const CreateClock = () => {
  const clock = new Clock("images/MidnightClock.jpg", 0, clockID++);
  const section = document.getElementById("header");
  section.append(clock.details);
  totalClocks.push(clock);
};

const AddMultiCounter = () => {
  totalClocks.forEach((clock) => {
    clock.counter++;
  });
  PrintClocks();
};

const PrintClocks = () => {
  const clocks = document.querySelectorAll(".clock");
  clocks.forEach((clock) => {
    clock.remove();
  });

  totalClocks.forEach((clock) => {
    const section = document.getElementById("header");
    section.append(clock.details);
  });
};

window.onload = () => {
  document.querySelector("#add_clock").onclick = CreateClock;
  document.querySelector("#add_counter").onclick = AddMultiCounter;
};
