"use client";

import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Plus, FileDown, Table as TableIcon, BarChart3 } from "lucide-react";

// Import Dashboard Components
import { InsightCards } from "../dashboard/InsightCards";
import MentionsOverTimeWidget from "./MentionsOverTimeWidget";
import SentimentWidget from "./SentimentWidget";
import AreaChartWidget from "./AreaChartWidget";
import KeywordsCloudWidget from "./KeywordsCloudWidget";
import ShareOfVoiceWidget from "./ShareOfVoiceWidget";
import AgeGenderWidget from "./AgeGenderWidget";
import TopLocationsWidget from "./TopLocationsWidget";
import MentionsBySourceWidget from "./MentionsBySourceWidget";

// Define available widgets
const AVAILABLE_WIDGETS = [
    { id: "mentions-over-time", label: "Mentions au fil du temps", component: MentionsOverTimeWidget, supportsViewMode: true },
    { id: "mentions-by-source", label: "Mentions par Source", component: MentionsBySourceWidget, supportsViewMode: true },
    { id: "chart-sentiment", label: "Graphique de Sentiment", component: SentimentWidget, supportsViewMode: true },
    { id: "chart-area", label: "Graphique de Zone", component: AreaChartWidget, supportsViewMode: true },
    { id: "keywords-nuage", label: "Nuage de Mots-clés", component: KeywordsCloudWidget, supportsViewMode: true },
    { id: "share-of-voice", label: "Part de Voix", component: ShareOfVoiceWidget, supportsViewMode: true },
    { id: "age-gender", label: "Répartition Âge & Genre", component: AgeGenderWidget, supportsViewMode: true },
    { id: "top-locations", label: "Top Localisations", component: TopLocationsWidget, supportsViewMode: true },
];

interface WidgetItem {
    id: string;
    widgetId: string;
    viewMode?: "chart" | "table";
}
// Sortable Item Component
function SortableItem(props: {
    id: string;
    widgetId: string;
    viewMode?: "chart" | "table";
    onRemove: (id: string) => void;
    onViewModeChange: (id: string, mode: "chart" | "table") => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const widget = AVAILABLE_WIDGETS.find((w) => w.id === props.widgetId);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative mb-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950 print:border-none print:shadow-none print:p-0 print:mb-8"
        >
            <div className="mb-4 flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-800 print:hidden">
                <div className="flex items-center gap-2">
                    <button {...attributes} {...listeners} className="cursor-grab text-neutral-400 hover:text-neutral-600 active:cursor-grabbing">
                        <GripVertical size={20} />
                    </button>
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{widget?.label}</span>
                </div>
                <div className="flex items-center gap-2">
                    {widget?.supportsViewMode && (
                        <div className="flex items-center rounded-md border border-neutral-200 bg-neutral-50 p-1 dark:border-neutral-800 dark:bg-neutral-900">
                            <button
                                onClick={() => props.onViewModeChange(props.id, "chart")}
                                className={`rounded p-1 transition-colors ${props.viewMode === "chart"
                                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                                    : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500"
                                    }`}
                                title="Chart View"
                            >
                                <BarChart3 size={16} />
                            </button>
                            <button
                                onClick={() => props.onViewModeChange(props.id, "table")}
                                className={`rounded p-1 transition-colors ${props.viewMode === "table"
                                    ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-white"
                                    : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-500"
                                    }`}
                                title="Table View"
                            >
                                <TableIcon size={16} />
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => props.onRemove(props.id)}
                        className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
            <div className="pointer-events-none">
                {/* We disable pointer events inside the preview to prevent interaction issues while dragging, 
            but for a report builder we might want them enabled. 
            For now, let's keep them enabled but handle drag handle separately. */}
                <div className="pointer-events-auto">
                    {widget && <widget.component viewMode={props.viewMode} />}
                </div>
            </div>
        </div>
    );
}

export default function ReportBuilder() {
    const [items, setItems] = useState<WidgetItem[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const addWidget = (widgetId: string) => {
        const newId = `${widgetId}-${Date.now()}`;
        const widget = AVAILABLE_WIDGETS.find((w) => w.id === widgetId);
        const viewMode = widget?.supportsViewMode ? "chart" : undefined;
        setItems([...items, { id: newId, widgetId, viewMode }]);
    };

    const removeWidget = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleViewModeChange = (id: string, mode: "chart" | "table") => {
        setItems(items.map((item) => (item.id === id ? { ...item, viewMode: mode } : item)));
    };

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({
        contentRef,
        documentTitle: "Rapport Personnalisé",
    });

    const handlePrint = () => {
        reactToPrintFn();
    };

    return (
        <div className="flex min-h-screen flex-col gap-6 p-6 md:flex-row">
            {/* Sidebar - Available Widgets */}
            <div className="w-full md:w-80 shrink-0 print:hidden">
                <div className="sticky top-6 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                    <h2 className="mb-4 text-lg font-semibold">Widgets Disponibles</h2>
                    <div className="flex flex-col gap-2">
                        {AVAILABLE_WIDGETS.map((widget) => (
                            <button
                                key={widget.id}
                                onClick={() => addWidget(widget.id)}
                                className="flex w-full items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-left transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                            >
                                <span className="text-sm font-medium">{widget.label}</span>
                                <Plus size={16} className="text-neutral-500" />
                            </button>
                        ))}
                    </div>
                    <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <p className="mb-4 text-xs text-neutral-500">
                            Cliquez sur + pour ajouter des widgets à votre rapport. Faites glisser les widgets dans la zone principale pour les réorganiser.
                        </p>
                        <button
                            onClick={handlePrint}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                        >
                            <FileDown size={16} />
                            Télécharger PDF
                        </button>
                    </div>
                </div>
            </div>            {/* Main Area - Report Canvas */}
            <div className="flex-1" ref={contentRef}>
                <div className="mb-6 print:hidden">
                    <h1 className="text-2xl font-bold">Générateur de Rapports Personnalisés</h1>
                    <p className="text-neutral-500">Construisez votre rapport personnalisé en ajoutant des widgets depuis la barre latérale.</p>
                </div>

                <div className="hidden print:block mb-8">
                    <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold">Rapport d'Analyse</h1>
                            <p className="text-gray-500 mt-1">Généré le {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-6 dark:border-neutral-800 dark:bg-neutral-900/20 print:border-none print:bg-transparent print:p-0">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center py-20 text-neutral-400">
                            <p>Aucun widget ajouté pour le moment.</p>
                            <p className="text-sm">Sélectionnez des widgets dans la barre latérale pour commencer.</p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={items.map((item) => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="flex flex-col gap-6">
                                    {items.map((item) => (
                                        <SortableItem
                                            key={item.id}
                                            id={item.id}
                                            widgetId={item.widgetId}
                                            viewMode={item.viewMode}
                                            onRemove={removeWidget}
                                            onViewModeChange={handleViewModeChange}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          .print\\:mb-8 {
            margin-bottom: 2rem !important;
          }
          /* Hide drag handles and delete buttons in print */
          button {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}
