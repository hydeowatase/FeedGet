export function WidgetForm() {
  // w-[calc(100vm-2rem) =  100% do view-port-width menos 2 rem
  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      Hello World
    </div>
  );
}
