(function attachStore(globalScope) {
  const STORAGE_KEY = "athletic-bugs-state";
  const namespace = globalScope.AthleticBugs ?? (globalScope.AthleticBugs = {});

  const defaultState = {
    upperBody: 4,
    lowerBody: 4,
    mood: "focused",
    note: "Arranque equilibrado.",
    history: [
      {
        id: crypto.randomUUID(),
        upperBody: 4,
        lowerBody: 4,
        mood: "focused",
        note: "Buggy desperto listo para el taller.",
        createdAt: new Date().toISOString()
      }
    ]
  };

  const subscribers = new Set();
  let gameState = loadState();

  function cloneState(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (!savedState) {
        return cloneState(defaultState);
      }

      const parsedState = JSON.parse(savedState);
      return {
        ...cloneState(defaultState),
        ...parsedState,
        history: Array.isArray(parsedState.history) && parsedState.history.length > 0
          ? parsedState.history
          : cloneState(defaultState.history)
      };
    } catch {
      return cloneState(defaultState);
    }
  }

  function persistState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }

  function emitChange() {
    persistState();
    const snapshot = getState();
    subscribers.forEach((subscriber) => subscriber(snapshot));
  }

  function getState() {
    return cloneState(gameState);
  }

  function subscribe(listener) {
    subscribers.add(listener);
    listener(getState());

    return () => {
      subscribers.delete(listener);
    };
  }

  function commitSession(payload) {
    const nextEntry = {
      id: crypto.randomUUID(),
      upperBody: payload.upperBody,
      lowerBody: payload.lowerBody,
      mood: payload.mood,
      note: payload.note,
      createdAt: new Date().toISOString()
    };

    gameState = {
      ...gameState,
      ...payload,
      history: [nextEntry, ...gameState.history].slice(0, 5)
    };

    emitChange();
  }

  function resetState() {
    gameState = cloneState(defaultState);
    emitChange();
  }

  function getProgressSnapshot(state) {
    const headTier = mapMoodToHeadTier(state.mood);
    const torsoTier = mapScoreToTier(state.upperBody);
    const legTier = mapScoreToTier(state.lowerBody);
    const balance = Math.abs(state.upperBody - state.lowerBody);
    const totalLoad = state.upperBody + state.lowerBody;

    return {
      headTier,
      torsoTier,
      legTier,
      balance,
      totalLoad,
      rankLabel: getRankLabel(totalLoad, balance),
      statusCopy: getStatusCopy(state, balance)
    };
  }

  function mapScoreToTier(value) {
    if (value <= 3) {
      return 0;
    }

    if (value <= 6) {
      return 1;
    }

    return 2;
  }

  function mapMoodToHeadTier(mood) {
    if (mood === "tired" || mood === "focused") {
      return 0;
    }

    if (mood === "playful") {
      return 1;
    }

    return 2;
  }

  function getRankLabel(totalLoad, balance) {
    if (totalLoad >= 17 && balance <= 2) {
      return "Titan Hibrido";
    }

    if (totalLoad >= 14) {
      return "Modo Competicion";
    }

    if (totalLoad >= 9) {
      return "Ritmo Ascendente";
    }

    return "Nivel Base";
  }

  function getStatusCopy(state, balance) {
    const moodCopy = {
      focused: "Cabeza fria y movimientos precisos.",
      charged: "Buggy vibra con energia de sprint.",
      playful: "Se mueve ligero y con confianza.",
      tired: "Necesita recuperacion, pero sigue en pie."
    };

    if (balance >= 5) {
      return "La evolucion esta desbalanceada: conviene compensar el siguiente bloque.";
    }

    return moodCopy[state.mood] ?? moodCopy.focused;
  }

  namespace.store = {
    getState,
    subscribe,
    commitSession,
    resetState,
    getProgressSnapshot
  };
})(window);