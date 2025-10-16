const notifications = [
  {
    avatar: "",
    from: {
      name: "",
      id: "",
    },
    id: "0",
    text: "",
    date: "October 14, 2025",
  },
];
console.log(notifications[0].date);

function Sidebar() {
  return (
    <aside className="w-full h-full sticky top-0 flex flex-col gap-2 p-4"></aside>
  );
}
export default Sidebar;
