import { ComponentType } from 'react';

export type ViewComponentType<T> = ComponentType<{ item: T }>;
