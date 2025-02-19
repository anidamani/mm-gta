"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Loader2, Plus, XCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Mosque, PrayerType } from "@/types/mosque"

const cities = ["Toronto", "Mississauga", "Scarborough", "Brampton", "Markham"]

export default function SubmitPage() {
  const router = useRouter()
  // Remove toast initialization
  // const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<PrayerType>("taraweeh")

  const [formData, setFormData] = React.useState<Partial<Mosque>>({
    mosque_name: "",
    address: "",
    city: "",
    website: "",
    additional_notes: "",
    taraweeh: {
      rakaat: null,
      times: [{ start_date: "", end_date: "", prayer_time: "" }],
    },
    jumuah: {
      times: [{ prayer_number: 1, prayer_time: "", notes: "" }],
    },
    eid: {
      times: [{ prayer_number: 1, prayer_time: "", eid_type: "ul-fitr", notes: "" }],
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.mosque_name || !formData.address || !formData.city) {
        throw new Error("Please fill in all required fields")
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Remove toast notifications
      // toast({
      //   title: "Success",
      //   description: "Your submission has been received and is pending review.",
      // })

      router.push("/")
    } catch (error) {
      // Remove toast notifications
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Something went wrong",
      // })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPrayerTime = (type: PrayerType) => {
    setFormData((prev) => {
      if (!prev) return prev

      switch (type) {
        case "taraweeh":
          return {
            ...prev,
            taraweeh: {
              ...prev.taraweeh!,
              times: [...prev.taraweeh!.times, { start_date: "", end_date: "", prayer_time: "" }],
            },
          }
        case "jumuah":
          const nextJumuahNumber = Math.max(...prev.jumuah!.times.map((t) => t.prayer_number)) + 1
          return {
            ...prev,
            jumuah: {
              times: [...prev.jumuah!.times, { prayer_number: nextJumuahNumber, prayer_time: "", notes: "" }],
            },
          }
        case "eid":
          const nextEidNumber = Math.max(...(prev.eid?.times || []).map((t) => t.prayer_number), 0) + 1
          return {
            ...prev,
            eid: {
              times: [
                ...(prev.eid?.times || []),
                { prayer_number: nextEidNumber, prayer_time: "", eid_type: "ul-fitr", notes: "" },
              ],
            },
          }
        default:
          return prev
      }
    })
  }

  const handleRemovePrayerTime = (type: PrayerType, index: number) => {
    setFormData((prev) => {
      if (!prev) return prev

      switch (type) {
        case "taraweeh":
          const taraweehTimes = [...prev.taraweeh!.times]
          taraweehTimes.splice(index, 1)
          return {
            ...prev,
            taraweeh: {
              ...prev.taraweeh!,
              times: taraweehTimes,
            },
          }
        case "jumuah":
          const jumuahTimes = [...prev.jumuah!.times]
          jumuahTimes.splice(index, 1)
          return {
            ...prev,
            jumuah: {
              times: jumuahTimes,
            },
          }
        case "eid":
          const eidTimes = [...(prev.eid?.times || [])]
          eidTimes.splice(index, 1)
          return {
            ...prev,
            eid: {
              times: eidTimes,
            },
          }
        default:
          return prev
      }
    })
  }

  return (
    <div className="container max-w-3xl py-6">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Submit New Location</h1>
        <p className="text-muted-foreground">
          Submit a new mosque or prayer location. Your submission will be reviewed before being published.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Location Details</CardTitle>
            <CardDescription>Basic information about the mosque or prayer location.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mosque_name">
                  Mosque Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mosque_name"
                  value={formData.mosque_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, mosque_name: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">
                  City <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, city: value }))}
                  required
                >
                  <SelectTrigger id="city">
                    <SelectValue placeholder="Select a city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) => setFormData((prev) => ({ ...prev, website: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the location..."
                value={formData.additional_notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, additional_notes: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Prayer Information</CardTitle>
            <CardDescription>Add prayer times and details for different prayer types.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PrayerType)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="taraweeh">Taraweeh</TabsTrigger>
                <TabsTrigger value="jumuah">Jumuah</TabsTrigger>
                <TabsTrigger value="eid">Eid</TabsTrigger>
              </TabsList>

              <TabsContent value="taraweeh" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Label>Number of Rakaat (Optional)</Label>
                    <Select
                      value={formData.taraweeh?.rakaat?.toString()}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          taraweeh: {
                            ...prev.taraweeh!,
                            rakaat: value === "null" ? null : Number(value),
                          },
                        }))
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select rakaat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="null">Unknown</SelectItem>
                        <SelectItem value="8">8 Rakaat</SelectItem>
                        <SelectItem value="20">20 Rakaat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="button" variant="outline" onClick={() => handleAddPrayerTime("taraweeh")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Time Period
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.taraweeh?.times.map((time, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                              type="date"
                              value={time.start_date}
                              onChange={(e) => {
                                const newTimes = [...formData.taraweeh!.times]
                                newTimes[index] = { ...time, start_date: e.target.value }
                                setFormData((prev) => ({
                                  ...prev,
                                  taraweeh: { ...prev.taraweeh!, times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                              type="date"
                              value={time.end_date}
                              onChange={(e) => {
                                const newTimes = [...formData.taraweeh!.times]
                                newTimes[index] = { ...time, end_date: e.target.value }
                                setFormData((prev) => ({
                                  ...prev,
                                  taraweeh: { ...prev.taraweeh!, times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Prayer Time</Label>
                            <div className="flex gap-2">
                              <Input
                                type="time"
                                value={time.prayer_time}
                                onChange={(e) => {
                                  const newTimes = [...formData.taraweeh!.times]
                                  newTimes[index] = { ...time, prayer_time: e.target.value }
                                  setFormData((prev) => ({
                                    ...prev,
                                    taraweeh: { ...prev.taraweeh!, times: newTimes },
                                  }))
                                }}
                              />
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemovePrayerTime("taraweeh", index)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="jumuah" className="space-y-4">
                <div className="flex justify-end">
                  <Button type="button" variant="outline" onClick={() => handleAddPrayerTime("jumuah")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Prayer Time
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.jumuah?.times.map((time, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label>Prayer Number</Label>
                            <Input
                              type="number"
                              value={time.prayer_number}
                              onChange={(e) => {
                                const newTimes = [...formData.jumuah!.times]
                                newTimes[index] = { ...time, prayer_number: Number(e.target.value) }
                                setFormData((prev) => ({
                                  ...prev,
                                  jumuah: { times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Prayer Time</Label>
                            <Input
                              type="time"
                              value={time.prayer_time}
                              onChange={(e) => {
                                const newTimes = [...formData.jumuah!.times]
                                newTimes[index] = { ...time, prayer_time: e.target.value }
                                setFormData((prev) => ({
                                  ...prev,
                                  jumuah: { times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Notes (Optional)</Label>
                            <div className="flex gap-2">
                              <Input
                                value={time.notes}
                                onChange={(e) => {
                                  const newTimes = [...formData.jumuah!.times]
                                  newTimes[index] = { ...time, notes: e.target.value }
                                  setFormData((prev) => ({
                                    ...prev,
                                    jumuah: { times: newTimes },
                                  }))
                                }}
                                placeholder="e.g., Language"
                              />
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemovePrayerTime("jumuah", index)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="eid" className="space-y-4">
                <div className="flex justify-end">
                  <Button type="button" variant="outline" onClick={() => handleAddPrayerTime("eid")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Prayer Time
                  </Button>
                </div>

                <div className="space-y-4">
                  {formData.eid?.times.map((time, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-2">
                            <Label>Prayer Number</Label>
                            <Input
                              type="number"
                              value={time.prayer_number}
                              onChange={(e) => {
                                const newTimes = [...formData.eid!.times]
                                newTimes[index] = { ...time, prayer_number: Number(e.target.value) }
                                setFormData((prev) => ({
                                  ...prev,
                                  eid: { times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Prayer Time</Label>
                            <Input
                              type="time"
                              value={time.prayer_time}
                              onChange={(e) => {
                                const newTimes = [...formData.eid!.times]
                                newTimes[index] = { ...time, prayer_time: e.target.value }
                                setFormData((prev) => ({
                                  ...prev,
                                  eid: { times: newTimes },
                                }))
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Eid Type</Label>
                            <Select
                              value={time.eid_type}
                              onValueChange={(value: "ul-fitr" | "ul-adha") => {
                                const newTimes = [...formData.eid!.times]
                                newTimes[index] = { ...time, eid_type: value }
                                setFormData((prev) => ({
                                  ...prev,
                                  eid: { times: newTimes },
                                }))
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ul-fitr">Eid ul-Fitr</SelectItem>
                                <SelectItem value="ul-adha">Eid ul-Adha</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Notes (Optional)</Label>
                            <div className="flex gap-2">
                              <Input
                                value={time.notes}
                                onChange={(e) => {
                                  const newTimes = [...formData.eid!.times]
                                  newTimes[index] = { ...time, notes: e.target.value }
                                  setFormData((prev) => ({
                                    ...prev,
                                    eid: { times: newTimes },
                                  }))
                                }}
                                placeholder="e.g., Language"
                              />
                              {index > 0 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => handleRemovePrayerTime("eid", index)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit for Review
          </Button>
        </div>
      </form>
    </div>
  )
}

