(function attachBuggy(globalScope) {
  const namespace = globalScope.AthleticBugs ?? (globalScope.AthleticBugs = {});
  const store = namespace.store;

  const moodLabels = {
    focused: "Enfocado",
    charged: "Cargado",
    playful: "Jugueton",
    tired: "Cansado"
  };

  function initBuggy() {
    const statusCopy = document.querySelector("#status-copy");
    const rankLabel = document.querySelector("#buggy-rank");
    const moodOutput = document.querySelector("#mood-output");
    const sceneRank = document.querySelector("#scene-rank");

    if (!store || !statusCopy || !rankLabel || !moodOutput) {
      return;
    }

    store.subscribe((state) => {
      const snapshot = store.getProgressSnapshot(state);

      document.querySelectorAll(".buggy").forEach((avatar) => {
        avatar.dataset.headTier = String(snapshot.headTier);
        avatar.dataset.torsoTier = String(snapshot.torsoTier);
        avatar.dataset.legTier = String(snapshot.legTier);
        avatar.dataset.mood = state.mood;
        avatar.style.setProperty("--buggy-upper-scale", (0.94 + state.upperBody * 0.03).toFixed(2));
        avatar.style.setProperty("--buggy-lower-scale", (0.94 + state.lowerBody * 0.03).toFixed(2));
      });

      statusCopy.textContent = snapshot.statusCopy;
      rankLabel.textContent = snapshot.rankLabel;
      if (sceneRank) {
        sceneRank.textContent = snapshot.rankLabel;
      }
      moodOutput.textContent = moodLabels[state.mood] ?? moodLabels.focused;
    });
  }

  namespace.buggy = {
    initBuggy
  };
})(window);