import { useEffect, useState } from 'react';
import { BoxIcon } from '@radix-ui/react-icons';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CogIcon,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import Link from './Link';
import { ModeToggle } from './ModeToggle';

{
  /* <div className="flex min-h-screen w-full flex-col">
<header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
  <nav className="hidden flex-col gap-4 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-4">
    <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base"> */
}

export function Header({
  active,
  disableToggle,
}: { active: string; disableToggle: boolean } & any) {
  const [url, setUrl] = useState<URL>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(new URL(window.location.href));
    }
  }, []);

  return (
    <div className="flex w-full flex-col">
      <header className="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
        <nav className="hidden flex-col gap-4 font-medium md:flex md:flex-row md:items-center md:gap-3 md:text-sm lg:gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <CogIcon className="h-6 w-6" />
            <span className="sr-onlxy">Blobbed.xyz</span>
          </Link>
          <Link
            href="/create"
            className={cn('text-muted-foreground hover:text-foreground transition-colors', {
              'text-foreground font-semibold': url?.pathname === '/create',
            })}
          >
            Create
          </Link>
          <Link
            href="/blob-20-spec"
            className={cn('text-muted-foreground hover:text-foreground transition-colors', {
              'text-foreground font-semibold': url?.pathname === '/blob-20-spec',
            })}
          >
            Specification
          </Link>
          <Link
            href="https://docs.ethscriptions.com/esips/esip-8-ethscription-attachments-aka-blobscriptions"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ESIP-8
          </Link>
          <Link
            href="/wallet"
            className={cn('text-muted-foreground hover:text-foreground transition-colors', {
              'text-foregroun font-semiboldd': url?.pathname === '/wallet',
            })}
          >
            Wallet
          </Link>
          <Link
            href="/api"
            className={cn('text-muted-foreground hover:text-foreground transition-colors', {
              'text-foreground font-semibold': url?.pathname === '/api',
            })}
          >
            API
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                <CogIcon className="h-6 w-6" />
                <span className="sr-oxnly">Blobbed.xyz</span>
              </Link>
              <Link
                href="/tokens"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Create
              </Link>
              <Link
                href="/blob-20-spec"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blob-20 Spec
              </Link>
              <Link
                href="https://docs.ethscriptions.com/esips/esip-8-ethscription-attachments-aka-blobscriptions"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ESIP-8
              </Link>
              <Link
                href="/wallet"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Wallet
              </Link>
              <Link
                href="/api"
                className={cn(
                  'text-muted-foreground hover:text-foreground transition-colors',
                  active === url?.pathname ? 'text-foreground' : '',
                )}
              >
                API
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center md:ml-auto md:gap-2">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                size={12}
                type="search"
                placeholder="Search..."
                className="sxm:w-[300px] mxd:w-[200px] lxg:w-[400px] pl-8"
              />
            </div>
          </form>
          {!disableToggle && <ModeToggle />}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </header>
      {/*  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-muted-foreground text-xs">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-muted-foreground text-xs">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-muted-foreground text-xs">+19% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-muted-foreground text-xs">+201 since last hour</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Recent transactions from your store.</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="#">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden xl:table-column">Type</TableHead>
                    <TableHead className="hidden xl:table-column">Status</TableHead>
                    <TableHead className="hidden xl:table-column">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Sale</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Olivia Smith</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        olivia@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Refund</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Declined
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-24
                    </TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Noah Williams</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        noah@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Subscription</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-25
                    </TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Emma Brown</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        emma@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Sale</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-26
                    </TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="text-muted-foreground hidden text-sm md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-column">Sale</TableCell>
                    <TableCell className="hidden xl:table-column">
                      <Badge className="text-xs" variant="outline">
                        Approved
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-27
                    </TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-muted-foreground text-sm">olivia.martin@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$1,999.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/02.png" alt="Avatar" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Jackson Lee</p>
                  <p className="text-muted-foreground text-sm">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/03.png" alt="Avatar" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                  <p className="text-muted-foreground text-sm">isabella.nguyen@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$299.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/04.png" alt="Avatar" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">William Kim</p>
                  <p className="text-muted-foreground text-sm">will@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$99.00</div>
              </div>
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src="/avatars/05.png" alt="Avatar" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Sofia Davis</p>
                  <p className="text-muted-foreground text-sm">sofia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+$39.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>*/}
    </div>
  );
}
