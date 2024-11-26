export function randomColor(propsLength: number) {
  const colors = [
    {
      backgroundColor: "#ecfdf3",
      color: "#027a48",
    },
    {
      backgroundColor: "#f9f5ff",
      color: "#6a40c3",
    },
    {
      backgroundColor: "#fffaeb",
      color: "#b54708",
    },

    {
      backgroundColor: "#f0f9ff",
      color: "#026aa2",
    },

    {
      backgroundColor: "#fef3f2",
      color: "#b42318",
    },

    {
      backgroundColor: "#dce9f7",
      color: "#6A40C3",
    },
    {
      backgroundColor: "#d6f5d0",
      color: "#1F395A",
    },
    {
      backgroundColor: "#d7fcde",
      color: "#22566B",
    },
  ];

  const index = propsLength % colors.length;
  return colors[index];
}
