"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/ui/section-card";

interface SortableSkillBadgeProps {
  skill: string;
  onRemove: () => void;
}

function SortableSkillBadge({ skill, onRemove }: SortableSkillBadgeProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: skill });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="inline-flex touch-none items-center gap-1 rounded-md bg-muted px-2.5 py-1 text-sm select-none"
    >
      {skill}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="ml-1 text-muted-foreground hover:text-foreground cursor-pointer"
        aria-label={`Remover ${skill}`}
      >
        &times;
      </button>
    </span>
  );
}

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  aiButton?: ReactNode;
}

export function SkillsForm({ skills, onChange, onReorder, aiButton }: SkillsFormProps) {
  const [input, setInput] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  function addSkill() {
    const trimmed = input.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    onChange([...skills, trimmed]);
    setInput("");
  }

  function removeSkill(skill: string) {
    onChange(skills.filter((s) => s !== skill));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const fromIndex = skills.indexOf(active.id as string);
      const toIndex = skills.indexOf(over.id as string);
      onReorder(fromIndex, toIndex);
    }
  }

  return (
    <SectionCard title="Habilidades" actions={aiButton}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Digite uma habilidade e pressione Enter"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button type="button" variant="secondary" onClick={addSkill}>
          Adicionar
        </Button>
      </div>
      {skills.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={skills} strategy={horizontalListSortingStrategy}>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <SortableSkillBadge
                  key={skill}
                  skill={skill}
                  onRemove={() => removeSkill(skill)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </SectionCard>
  );
}
