(function attachUi(globalScope) {
  const namespace = globalScope.AthleticBugs ?? (globalScope.AthleticBugs = {});
  const store = namespace.store;
  const buggy = namespace.buggy;

  const moodLabels = {
    focused: "Enfocado",
    charged: "Cargado",
    playful: "Jugueton",
    tired: "Cansado"
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!store || !buggy) {
      return;
    }

    buggy.initBuggy();

    const form = document.querySelector("#training-form");
    const upperRange = document.querySelector("#upper-body-range");
    const lowerRange = document.querySelector("#lower-body-range");
    const noteField = document.querySelector("#session-note");
    const upperOutput = document.querySelector("#upper-output");
    const lowerOutput = document.querySelector("#lower-output");
    const moodPicker = document.querySelector("#mood-picker");
    const historyList = document.querySelector("#session-history");
    const resetButton = document.querySelector("#reset-button");
    const sceneOverlay = document.querySelector("#scene-overlay");
    const sceneCloseButton = document.querySelector("#scene-close");

    if (!form || !upperRange || !lowerRange || !noteField || !upperOutput || !lowerOutput || !moodPicker || !historyList || !resetButton || !sceneOverlay || !sceneCloseButton) {
      return;
    }

    let currentMood = store.getState().mood;

    upperRange.addEventListener("input", () => {
      upperOutput.textContent = upperRange.value;
    });

    lowerRange.addEventListener("input", () => {
      lowerOutput.textContent = lowerRange.value;
    });

    moodPicker.addEventListener("click", (event) => {
      const moodButton = event.target instanceof Element ? event.target.closest("button[data-mood-option]") : null;
      if (!(moodButton instanceof HTMLButtonElement)) {
        return;
      }

      const nextMood = moodButton.dataset.moodOption;
      if (!nextMood) {
        return;
      }

      currentMood = nextMood;
      paintMoodSelection(moodPicker, currentMood);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      store.commitSession({
        upperBody: Number(upperRange.value),
        lowerBody: Number(lowerRange.value),
        mood: currentMood,
        note: noteField.value.trim() || "Sesion registrada sin notas."
      });

      openSceneOverlay(sceneOverlay);
    });

    resetButton.addEventListener("click", () => {
      closeSceneOverlay(sceneOverlay);
      store.resetState();
    });

    sceneCloseButton.addEventListener("click", () => {
      closeSceneOverlay(sceneOverlay);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeSceneOverlay(sceneOverlay);
      }
    });

    store.subscribe((state) => {
      upperRange.value = String(state.upperBody);
      lowerRange.value = String(state.lowerBody);
      noteField.value = state.note;
      upperOutput.textContent = String(state.upperBody);
      lowerOutput.textContent = String(state.lowerBody);
      currentMood = state.mood;

      const moodOutput = document.querySelector("#mood-output");
      if (moodOutput) {
        moodOutput.textContent = moodLabels[state.mood] ?? moodLabels.focused;
      }

      paintMoodSelection(moodPicker, currentMood);
      renderHistory(historyList, state.history);
    });
  });

  function openSceneOverlay(overlay) {
    overlay.classList.remove("is-hidden");
    overlay.setAttribute("aria-hidden", "false");
  }

  function closeSceneOverlay(overlay) {
    overlay.classList.add("is-hidden");
    overlay.setAttribute("aria-hidden", "true");
  }

  function paintMoodSelection(container, currentMood) {
    const moodButtons = container.querySelectorAll("[data-mood-option]");

    moodButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.moodOption === currentMood);
    });
  }

  function renderHistory(container, history) {
    container.replaceChildren();

    history.forEach((entry) => {
      const item = document.createElement("li");
      item.className = "history-list__item";

      const stamp = new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(entry.createdAt));

      const metaDiv = document.createElement("div");
      const moodStrong = document.createElement("strong");
      moodStrong.textContent = moodLabels[entry.mood] ?? moodLabels.focused;
      const noteParagraph = document.createElement("p");
      noteParagraph.textContent = entry.note;
      metaDiv.append(moodStrong, noteParagraph);

      const statsDiv = document.createElement("div");
      statsDiv.className = "history-list__stats";
      const upperSpan = document.createElement("span");
      upperSpan.textContent = `S ${entry.upperBody}`;
      const lowerSpan = document.createElement("span");
      lowerSpan.textContent = `I ${entry.lowerBody}`;
      const timeEl = document.createElement("time");
      timeEl.setAttribute("datetime", entry.createdAt);
      timeEl.textContent = stamp;
      statsDiv.append(upperSpan, lowerSpan, timeEl);

      item.append(metaDiv, statsDiv);
      container.append(item);
    });
  }
})(window);