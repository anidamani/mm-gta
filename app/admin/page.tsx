"use client"

import * as React from "react"
import { CheckCircle2, Clock, XCircle, Pencil, Filter } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Mosque, PrayerType } from "@/types/mosque"

interface Submission extends Mosque {
  status: "pending" | "approved" | "rejected"
  submitted_at: string
  contact_name: string
  contact_email: string
}

const mosques: Mosque[] = [
  {
    id: "1",
    mosque_name: "Islamic Foundation of Toronto",
    address: "441 Nugget Ave",
    city: "Scarborough",
    additional_notes: "Ample parking available. Separate prayer areas for brothers and sisters.",
    website: "https://islamicfoundation.ca",
    taraweeh: {
      rakaat: 20,
      times: [
        { start_date: "2024-03-11", end_date: "2024-03-20", prayer_time: "20:45" },
        { start_date: "2024-03-21", end_date: "2024-03-31", prayer_time: "21:00" },
        { start_date: "2024-04-01", end_date: "2024-04-09", prayer_time: "21:15" },
      ],
    },
    jumuah: {
      times: [
        { prayer_number: 1, prayer_time: "11:45", notes: "English Khutbah" },
        { prayer_number: 2, prayer_time: "13:00", notes: "Arabic Khutbah" },
        { prayer_number: 3, prayer_time: "14:00", notes: "Urdu Khutbah" },
      ],
    },
    eid: {
      times: [
        { prayer_number: 1, prayer_time: "07:00", eid_type: "ul-fitr", notes: "English Khutbah" },
        { prayer_number: 2, prayer_time: "08:30", eid_type: "ul-fitr", notes: "Arabic Khutbah" },
      ],
    },
  },
  // ... Add more mosques
]

const submissions: Submission[] = [
  {
    id: "sub1",
    mosque_name: "New Islamic Center",
    address: "789 Example Street",
    city: "Toronto",
    additional_notes: "Large parking available",
    contact_name: "Ahmed Khan",
    contact_email: "ahmed@example.com",
    status: "pending",
    submitted_at: "2024-02-17T20:30:00Z",
    taraweeh: {
      rakaat: 20,
      times: [{ start_date: "2024-03-11", end_date: "2024-03-20", prayer_time: "20:45" }],
    },
  },
  // ... Add more submissions
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = React.useState<"locations" | "submissions">("locations")
  const [statusFilter, setStatusFilter] = React.useState<"all" | "pending" | "approved" | "rejected">("all")
  const [cityFilter, setCityFilter] = React.useState<string>("all")
  const [prayerTypeFilter, setPrayerTypeFilter] = React.useState<"all" | PrayerType>("all")
  const [isProcessing, setIsProcessing] = React.useState<string | null>(null)
  const [editingMosque, setEditingMosque] = React.useState<Mosque | null>(null)

  const cities = Array.from(new Set([...mosques, ...submissions].map(m => m.city))).sort()

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesCity = cityFilter === "all" || submission.city === cityFilter
    const matchesPrayerType = prayerTypeFilter === "all" || submission[prayerTypeFilter as Exclude<PrayerType, "all">]
    return matchesStatus && matchesCity && matchesPrayerType
  })

  const filteredMosques = mosques.filter(mosque => {
    const matchesCity = cityFilter === "all" || mosque.city === cityFilter
    const matchesPrayerType = prayerTypeFilter === "all" || mosque[prayerTypeFilter as Exclude<PrayerType, "all">]
    return matchesCity && matchesPrayerType
  })

  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const handleStatusChange = async (submissionId: string, newStatus: "approved" | "rejected") => {
    try {
      setIsProcessing(submissionId)
      setError(null)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Update the submission status
      submissions.find(s => s.id === submissionId)!.status = newStatus
      // Add success notification here
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setIsProcessing(null)
    }
  }

  const handleEdit = async (mosque: Mosque) => {
    setEditingMosque({ ...mosque })
  }

  const handleSaveEdit = async () => {
    if (!editingMosque) return
    setIsProcessing(editingMosque.id)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsProcessing(null)
    setEditingMosque(null)
  }


  return (
    <>
      <div className="container max-w-screen-md py-6">
        {error && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
            {error}
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage locations and review submissions</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "locations" | "submissions")}
          >
            <TabsList className="w-full">
              <TabsTrigger value="locations" className="flex-1">
                Active Locations
                <Badge variant="secondary" className="ml-2">{filteredMosques.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="submissions" className="flex-1">
                Submissions
                <Badge variant="secondary" className="ml-2">
                  {filteredSubmissions.filter(s => s.status === "pending").length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setCityFilter("all")
                      setPrayerTypeFilter("all")
                      if (activeTab === "submissions") {
                        setStatusFilter("all")
                      }
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select value={cityFilter} onValueChange={setCityFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={prayerTypeFilter}
                    onValueChange={(value: "all" | PrayerType) => setPrayerTypeFilter(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by prayer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prayers</SelectItem>
                      <SelectItem value="taraweeh">Taraweeh</SelectItem>
                      <SelectItem value="jumuah">Jumuah</SelectItem>
                      <SelectItem value="eid">Eid</SelectItem>
                    </SelectContent>
                  </Select>

                  {activeTab === "submissions" && (
                    <Select
                      value={statusFilter}
                      onValueChange={(value: "all" | "pending" | "approved" | "rejected") => setStatusFilter(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardHeader>
            </Card>

            <div className="mt-6 space-y-4">
              {activeTab === "submissions" ? (
                <>
                {filteredSubmissions.map((submission) => (
                  <Card key={submission.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <CardTitle>{submission.mosque_name}</CardTitle>
                            <Badge
                              variant={
                                submission.status === "approved"
                                  ? "default"
                                  : submission.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {submission.status === "pending" && <Clock className="mr-1 h-3 w-3 inline" />}
                              {submission.status === "approved" && <CheckCircle2 className="mr-1 h-3 w-3 inline" />}
                              {submission.status === "rejected" && <XCircle className="mr-1 h-3 w-3 inline" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                          </div>
                          <CardDescription>{submission.address}, {submission.city}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {submission.status === "pending" && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => handleStatusChange(submission.id, "approved")}
                                disabled={isProcessing === submission.id}
                              >
                                {isProcessing === submission.id ? "Processing..." : "Approve"}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleStatusChange(submission.id, "rejected")}
                                disabled={isProcessing === submission.id}
                              >
                                {isProcessing === submission.id ? "Processing..." : "Reject"}
                              </Button>
                            </>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Location</DialogTitle>
                                <DialogDescription>
                                  Make changes to the mosque information and prayer schedules below.
                                </DialogDescription>
                              </DialogHeader>
                              <Tabs defaultValue="details" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                  <TabsTrigger value="details">Details</TabsTrigger>
                                  <TabsTrigger value="taraweeh">Taraweeh</TabsTrigger>
                                  <TabsTrigger value="jumuah">Jumuah</TabsTrigger>
                                  <TabsTrigger value="eid">Eid</TabsTrigger>
                                </TabsList>
                                <TabsContent value="details" className="space-y-4">
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      {/* ... */}
                                    </div>
                                    <div className="space-y-2">
                                      {/* ... */}
                                    </div>
                                    <div className="space-y-2">
                                      {/* ... */}
                                    </div>
                                    <div className="space-y-2">
                                      {/* ... */}
                                    </div>
                                  </div>
                                </TabsContent>
                                <TabsContent value="taraweeh" className="space-y-4">
                                  {/* ... */}
                                </TabsContent>
                                <TabsContent value="jumuah" className="space-y-4">
                                  {/* ... */}
                                </TabsContent>
                                <TabsContent value="eid" className="space-y-4">
                                  {/* ... */}
                                </TabsContent>
                              </Tabs>
                              <DialogFooter>
                                <Button onClick={handleSaveEdit} disabled={isProcessing === editingMosque?.id}>
                                  {isProcessing === editingMosque?.id ? "Saving..." : "Save Changes"}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {/* ... */}
                        </div>
                        {/* ... */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </>
              ) : (
                <>
                {filteredMosques.map((mosque) => (
                  <Card key={mosque.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <CardTitle>{mosque.mosque_name}</CardTitle>
                          <CardDescription>
                            {mosque.address}, {mosque.city}
                          </CardDescription>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => handleEdit(mosque)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Edit Location</DialogTitle>
                              <DialogDescription>
                                Make changes to the mosque information and prayer schedules below.
                              </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="details" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="taraweeh">Taraweeh</TabsTrigger>
                                <TabsTrigger value="jumuah">Jumuah</TabsTrigger>
                                <TabsTrigger value="eid">Eid</TabsTrigger>
                              </TabsList>
                              <TabsContent value="details" className="space-y-4">
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    {/* ... */}
                                  </div>
                                  <div className="space-y-2">
                                    {/* ... */}
                                  </div>
                                  <div className="space-y-2">
                                    {/* ... */}
                                  </div>
                                  <div className="space-y-2">
                                    {/* ... */}
                                  </div>
                                </div>
                              </TabsContent>
                              <TabsContent value="taraweeh" className="space-y-4">
                                  {/* ... */}
                              </TabsContent>
                              <TabsContent value="jumuah" className="space-y-4">
                                  {/* ... */}
                              </TabsContent>
                              <TabsContent value="eid" className="space-y-4">
                                  {/* ... */}
                              </TabsContent>
                            </Tabs>
                            <DialogFooter>
                              <Button onClick={handleSaveEdit} disabled={isProcessing === editingMosque?.id}>
                                {isProcessing === editingMosque?.id ? "Saving..." : "Save Changes"}
                                </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {/* ... */}
                        </div>
                        {/* ... */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                </>
              )}
            </div>
          </Tabs>
          </>
        )}
      </div>
    </>
  )
}