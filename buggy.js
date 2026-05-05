import { getProgressSnapshot, subscribe } from "./store.js";

const moodLabels = {
  focused: "Enfocado",
  charged: "Cargado",
  playful: "Jugueton",
  tired: "Cansado"
};

export function initBuggy() {
  const avatar = document.querySelector("#buggy-avatar");
  const statusCopy = document.querySelector("#status-copy");
  const rankLabel = document.querySelector("#buggy-rank");
  const moodOutput = document.querySelector("#mood-output");

  if (!avatar || !statusCopy || !rankLabel || !moodOutput) {
    return;
  }

  subscribe((state) => {
    const snapshot = getProgressSnapshot(state);

    avatar.dataset.upperTier = String(snapshot.upperTier);
    avatar.dataset.lowerTier = String(snapshot.lowerTier);
    avatar.dataset.mood = state.mood;

    avatar.style.setProperty("--buggy-upper-scale", (1 + state.upperBody * 0.035).toFixed(2));
    avatar.style.setProperty("--buggy-lower-scale", (1 + state.lowerBody * 0.035).toFixed(2));
    avatar.style.setProperty("--buggy-balance", String(Math.max(0, 10 - snapshot.balance)));

    statusCopy.textContent = snapshot.statusCopy;
    rankLabel.textContent = snapshot.rankLabel;
    moodOutput.textContent = moodLabels[state.mood] ?? moodLabels.focused;
  });
}