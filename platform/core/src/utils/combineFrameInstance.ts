/**
 * Combine the Per instance frame data, the shared frame data
 * and the root data objects.
 * The data is combined by taking nested sequence objects within
 * the functional group sequences.  Data that is directly contained
 * within the functional group sequences, such as private creators
 * will be ignored.
 * This can be safely called with an undefined frame in order to handle
 * single frame data. (eg frame is undefined is the same as frame===1).
 */
const combineFrameInstance = (frame, instance) => {
  const {
    PerFrameFunctionalGroupsSequence,
    SharedFunctionalGroupsSequence,
    NumberOfFrames,
  } = instance;

  if (PerFrameFunctionalGroupsSequence || NumberOfFrames > 1) {
    const newInstance = { ...instance };

    for (let frameNumber = 0; frameNumber < NumberOfFrames; frameNumber++) {
      const shared = SharedFunctionalGroupsSequence
        ? SharedFunctionalGroupsSequence[frameNumber] || []
        : [];

      if (Array.isArray(shared)) {
        const sharedData = shared
          .map(it => (it ? it[0] : null))
          .filter(it => it !== null && typeof it === 'object');

        const perFrame = PerFrameFunctionalGroupsSequence
          ? Object.values(PerFrameFunctionalGroupsSequence[frameNumber])
            .map(it => (it ? it[0] : null))
            .filter(it => it !== null && typeof it === 'object')
          : [];

        // Combinar datos compartidos y datos por cuadro
        const frameData = [...sharedData, ...perFrame];

        // Merge frameData into newInstance
        frameData.forEach(item => {
          Object.entries(item).forEach(([key, value]) => {
            newInstance[key] = value;
          });
        }); // Agregar el paréntesis de cierre
      }
    }

    // Puedes considerar almacenar la instancia combinada aquí para uso futuro.
    return newInstance;
  } else {
    return instance;
  }
};

export default combineFrameInstance;
