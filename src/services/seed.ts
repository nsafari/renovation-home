import * as storage from './storage'

export function seedSampleData(): void {
  if (!storage.isStorageEmpty()) return

  const project1 = storage.createProject({
    name: 'Kitchen Renovation',
    description: 'Complete kitchen remodel including cabinets, countertops, and appliances.',
    startDate: '2026-08-01',
    endDate: '2026-09-15',
    status: 'in-progress',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Demolish old cabinets',
    description: 'Remove all existing upper and lower cabinets.',
    dueDate: '2026-08-10',
    scheduledDate: '2026-08-08',
    status: 'completed',
    priority: 'high',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Install new countertops',
    description: 'Granite countertops measured and installed.',
    dueDate: '2026-08-25',
    scheduledDate: '2026-08-22',
    status: 'in-progress',
    priority: 'high',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Paint walls',
    description: 'Apply two coats of warm white paint.',
    dueDate: '2026-08-20',
    scheduledDate: '2026-08-18',
    status: 'pending',
    priority: 'medium',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Install backsplash',
    description: 'Subway tile backsplash behind counters.',
    dueDate: '2026-08-30',
    scheduledDate: '2026-08-28',
    status: 'pending',
    priority: 'medium',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Replace lighting fixtures',
    description: 'Install pendant lights over island and under-cabinet LEDs.',
    dueDate: '2026-09-01',
    scheduledDate: '2026-08-30',
    status: 'pending',
    priority: 'low',
  })

  storage.addTask(project1.id, {
    projectId: project1.id,
    title: 'Install new appliances',
    description: 'Refrigerator, oven, and dishwasher delivery and hookup.',
    dueDate: '2026-09-10',
    scheduledDate: '2026-09-08',
    status: 'pending',
    priority: 'high',
  })

  const project2 = storage.createProject({
    name: 'Bathroom Remodel',
    description: 'Master bathroom upgrade with walk-in shower and new vanity.',
    startDate: '2026-08-15',
    endDate: '2026-09-30',
    status: 'in-progress',
  })

  storage.addTask(project2.id, {
    projectId: project2.id,
    title: 'Remove old tile flooring',
    description: 'Demo existing tile and prep subfloor.',
    dueDate: '2026-08-20',
    scheduledDate: '2026-08-17',
    status: 'in-progress',
    priority: 'high',
  })

  storage.addTask(project2.id, {
    projectId: project2.id,
    title: 'Install walk-in shower',
    description: 'Frame and tile the new walk-in shower enclosure.',
    dueDate: '2026-09-01',
    scheduledDate: '2026-08-28',
    status: 'pending',
    priority: 'high',
  })

  storage.addTask(project2.id, {
    projectId: project2.id,
    title: 'Install new vanity',
    description: 'Double vanity with marble top.',
    dueDate: '2026-09-05',
    scheduledDate: '2026-09-03',
    status: 'pending',
    priority: 'medium',
  })

  storage.addTask(project2.id, {
    projectId: project2.id,
    title: 'Update plumbing fixtures',
    description: 'New faucets, showerhead, and toilet installation.',
    dueDate: '2026-09-10',
    scheduledDate: '2026-09-08',
    status: 'pending',
    priority: 'medium',
  })

  storage.addTask(project2.id, {
    projectId: project2.id,
    title: 'Paint and finish',
    description: 'Paint walls, install trim, and final touches.',
    dueDate: '2026-09-25',
    scheduledDate: '2026-09-22',
    status: 'pending',
    priority: 'low',
  })
}
