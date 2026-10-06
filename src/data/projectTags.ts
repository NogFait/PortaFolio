// Tag badges per project. Lives next to the project data so the card and the
// detail panel always agree.
export function getTagsForProject(title: string): string[] {
  const map: Record<string, string[]> = {
    'Client Flow': ['SaaS', 'Fullstack'],
    'FoodStore': ['E-commerce'],
    'El Tornillo': ['Desarrollo Web'],
    'Studio Glam': ['Desarrollo Web'],
  }
  return map[title] ?? []
}
