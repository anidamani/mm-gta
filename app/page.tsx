"use client"

import * as React from "react"
import { Moon, MapPin, Clock, Building2, Search, ExternalLink, ChurchIcon as MosqueIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PrayerType } from "@/types/mosque"

import { mosques } from "@/data/mosques"

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [selectedCity, setSelectedCity] = React.useState<string>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [prayerType, setPrayerType] = React.useState<PrayerType>("taraweeh")
  const [isHeaderVisible, setIsHeaderVisible] = React.useState(true)
  const lastScrollY = React.useRef(0)

  const cities = Array.from(new Set(mosques.map((mosque) => mosque.city))).sort()

  // Add this state with other state declarations
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Modify the existing scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 10)
      setIsScrolled(currentScrollY > 100)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredMosques = mosques.filter((mosque) => {
    const matchesCity = selectedCity === "all" || mosque.city === selectedCity
    const matchesSearch =
      mosque.mosque_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mosque.address.toLowerCase().includes(searchQuery.toLowerCase())
    const hasPrayerType = prayerType === "taraweeh" 
      ? mosque.taraweeh?.times !== undefined 
      : mosque.jumuah?.times !== undefined
    return matchesCity && matchesSearch && hasPrayerType
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const getGoogleMapsUrl = (mosque_name: string, address: string, city: string) => {
    if (!address) return undefined;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${mosque_name}, ${address}, ${city}, ON, Canada`)}`
  }

  // Remove this unused function
  // const getCurrentTaraweehTime = (times: { start_date: string; end_date: string; prayer_time: string }[]) => {
  //   const now = new Date()
  //   const currentPeriod = times.find((time) => new Date(time.start_date) <= now && new Date(time.end_date) >= now)
  //   return currentPeriod?.prayer_time || times[0].prayer_time
  // }

  const getActivePeriodIndex = (
    times: { start_date: string; end_date: string; prayer_time: string }[]
  ) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    // If we're before the first period, return 0
    if (today < new Date(times[0].start_date)) {
      return 0
    }

    // Find the current period based on date range
    for (let i = 0; i < times.length; i++) {
      const startDate = new Date(times[i].start_date)
      const endDate = new Date(times[i].end_date)
      if (today >= startDate && today <= endDate) {
        return i
      }
    }

    // If we're after all periods, return the last index
    return times.length - 1
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent">
      <header className={cn(
        "fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300",
        !isHeaderVisible && "-translate-y-full"
      )}>
        <div className="container flex h-16 max-w-screen-md items-center">
          <div className="mr-4 hidden md:flex">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <MosqueIcon className="h-5 w-5 text-primary" />
            </div>
          </div>
          <h1 className="mr-auto text-xl font-semibold text-foreground">Muslims in GTA</h1>
          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              <Moon className="h-5 w-5" />
              <span className="sr-only">Toggle dark mode</span>
            </Button>
          </div>
        </div>
      </header>

      <div className={cn(
        "fixed w-full top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b transition-transform duration-300",
        !isScrolled && "translate-y-[-100%]"
      )}>
        <div className="container max-w-screen-md py-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search mosques..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <main className="container max-w-screen-md pt-20 pb-6">
        <Tabs 
          defaultValue="taraweeh" 
          value={prayerType} 
          onValueChange={(value) => setPrayerType(value as PrayerType)}
          className="flex flex-col"
        >
                <div className={cn(
                  "sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
                  isScrolled && "border-b"
                )}>
                  <TabsList className="grid w-full grid-cols-3 mb-0">
                    <TabsTrigger value="taraweeh">
                      <span className="md:inline hidden">Taraweeh Prayer</span>
                      <span className="md:hidden">Taraweeh</span>
                    </TabsTrigger>
                    <TabsTrigger value="jumuah">
                      <span className="md:inline hidden">Jumuah Prayer</span>
                      <span className="md:hidden">Jumuah</span>
                    </TabsTrigger>
                    <TabsTrigger value="eid" disabled className="relative">
                      <span className="md:inline hidden">Eid Prayer</span>
                      <span className="md:hidden">Eid</span>
                      <Badge
                        variant="secondary"
                        className="absolute -top-1 -right-1 text-xs px-1.5 py-0.5 bg-muted-foreground/10"
                      >
                        Soon
                      </Badge>
                    </TabsTrigger>
                  </TabsList>

                  <div className={cn(
                    "max-h-0 overflow-hidden transition-all duration-300",
                    isScrolled && "max-h-[60px] py-2"
                  )}>
                    <div className="container max-w-screen-md">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="search"
                            placeholder="Search mosques..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Cities</SelectItem>
                            {cities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
              </div>
      
                <Card className={cn(
                  "bg-card transition-opacity duration-300",
                  isScrolled && "opacity-0 pointer-events-none h-0 overflow-hidden"
                )}>
                  <CardHeader>
                    <CardTitle>{prayerType === "taraweeh" ? "Find Taraweeh" : "Find Jumuah"}</CardTitle>
                    <CardDescription>
                      {prayerType === "taraweeh"
                        ? "Search for Taraweeh prayer locations during Ramadan"
                        : "Search for Friday prayer locations and times"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search mosques..."
                          className="pl-9"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cities</SelectItem>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

          <div className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">  {/* Removed 'sticky top-0' class */}
                <h2 className="text-lg font-semibold">
                  {selectedCity === "all" ? "All Locations" : `Mosques in ${selectedCity}`}
                  <Badge variant="secondary" className="ml-2">
                    {filteredMosques.length}
                  </Badge>
                </h2>
                <Link href="/submit" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Add New Location
                </Link>
              </div>

              <div className="space-y-4">
                {filteredMosques.map((mosque) => (
                  <Card key={mosque.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            {mosque.website ? (
                              <a
                                href={mosque.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-semibold hover:text-primary transition-colors"
                              >
                                {mosque.mosque_name}
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            ) : (
                              <h3 className="font-semibold">{mosque.mosque_name}</h3>
                            )}
                          </div>
                          {prayerType === "taraweeh" && mosque.taraweeh?.rakaat && (
                            <Badge variant="outline" className="bg-background">
                              {mosque.taraweeh.rakaat} Rakat
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="h-4 w-4 text-primary" />
                            {mosque.city}
                          </div>
                          {mosque.address && (
                            <a
                              href={getGoogleMapsUrl(mosque.mosque_name, mosque.address, mosque.city) || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              <MapPin className="h-4 w-4" />
                              {mosque.address}, {mosque.city}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>

                        {prayerType === "taraweeh" && mosque.taraweeh?.times && (
                          <div className="grid gap-2">
                            <h4 className="font-medium text-sm">Prayer Schedule</h4>
                            <div className="grid gap-2">
                              {mosque.taraweeh.times.map((time, index) => {
                                const activePeriodIndex = getActivePeriodIndex(mosque.taraweeh!.times);
                                return (
                                  <div
                                    key={index}
                                    className={cn(
                                      "flex items-center gap-3",
                                      activePeriodIndex === index && "bg-accent"
                                    )}
                                  >
                                    <div className="flex items-center gap-2 min-w-[100px]">
                                      <Clock
                                        className={cn(
                                          "h-4 w-4",
                                          activePeriodIndex === index ? "text-primary" : "text-muted-foreground"
                                        )}
                                      />
                                      <span className={cn("font-medium", activePeriodIndex === index && "text-primary")}>
                                        {time.prayer_time}
                                      </span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {format(new Date(`${time.start_date}T00:00:00`), "MMM dd")} -{" "}
                                      {format(new Date(`${time.end_date}T00:00:00`), "MMM dd")}
                                    </span>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}

                        {prayerType === "jumuah" && mosque.jumuah && (
                          <div className="grid gap-2">
                            <h4 className="font-medium text-sm">Prayer Times</h4>
                            <div className="grid gap-2">
                              {mosque.jumuah.times.map((time) => (
                                <div key={time.prayer_number} className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 min-w-[100px]">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">{time.prayer_time}</span>
                                  </div>
                                  {time.notes && <span className="text-sm text-muted-foreground">{time.notes}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {mosque.additional_notes && (
                          <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
                            {mosque.additional_notes}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}