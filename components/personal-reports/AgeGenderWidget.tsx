"use client";

import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const chartData = [
    { ageGroup: "18-24", male: 45, female: 52, other: 3 },
    { ageGroup: "25-34", male: 120, female: 135, other: 8 },
    { ageGroup: "35-44", male: 95, female: 88, other: 5 },
    { ageGroup: "45-54", male: 78, female: 82, other: 4 },
    { ageGroup: "55-64", male: 62, female: 68, other: 2 },
    { ageGroup: "65+", male: 45, female: 52, other: 3 },
];

interface AgeGenderWidgetProps {
    viewMode?: "chart" | "table";
}

export default function AgeGenderWidget({ viewMode = "chart" }: AgeGenderWidgetProps) {
    return (
        <Card className="relative min-h-[400px]">
            <CardHeader>
                <CardTitle>Répartition par Age et Genre</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
                {viewMode === "chart" ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                            barSize={20}
                            barGap={2}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="ageGroup"
                                tickLine={false}
                                tickMargin={15}
                                axisLine={false}
                            />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="male"
                                name="Homme"
                                stackId="a"
                                fill="#9c0274"
                                radius={[0, 0, 4, 4]}
                            />
                            <Bar dataKey="female" name="Femme" stackId="a" fill="#ea1c80" />
                            <Bar
                                dataKey="other"
                                name="Autre"
                                stackId="a"
                                fill="#8376ce"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Groupe d'âge</TableHead>
                                    <TableHead className="text-right">Homme</TableHead>
                                    <TableHead className="text-right">Femme</TableHead>
                                    <TableHead className="text-right">Autre</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chartData.map((row) => (
                                    <TableRow key={row.ageGroup}>
                                        <TableCell className="font-medium">{row.ageGroup}</TableCell>
                                        <TableCell className="text-right">{row.male}</TableCell>
                                        <TableCell className="text-right">{row.female}</TableCell>
                                        <TableCell className="text-right">{row.other}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
