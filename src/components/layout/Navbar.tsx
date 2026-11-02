"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import assets from "@/assets";

const LOGO_SRC = assets.images.logo;

const links = [
  { label: "Home", href: "/" },
  { label: "Classes", href: "/classes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function Logo({ size }: { size: number }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid",
        borderColor: "secondary.main",
        bgcolor: "#000",
        flexShrink: 0,
      }}
    >
      <Image
        src={LOGO_SRC}
        alt="b8c Dance Company"
        fill
        priority
        sizes="80px"
        style={{ objectFit: "cover" }}
      />
    </Box>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#050505",
          color: "#fff",
          borderBottom: "2px solid",
          borderColor: "secondary.main",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 72, md: 96 },
            justifyContent: { xs: "space-between", md: "center" },
            gap: { md: 5 },
          }}
        >
          <Link href="/" style={{ display: "flex" }}>
            <Logo size={64} />
          </Link>

          {/* Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Button
                  key={l.href}
                  component={Link}
                  href={l.href}
                  disableRipple
                  sx={{
                    color: active ? "secondary.main" : "#fff",
                    fontSize: "0.8rem",
                    letterSpacing: "0.18em",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "secondary.main",
                    },
                  }}
                >
                  {l.label}
                </Button>
              );
            })}
            {/* <Button
              component={Link}
              href="/reservation"
              variant="contained"
              color="secondary"
            >
              Join Now
            </Button> */}
          </Box>

          {/* Mobile */}
          <IconButton
            color="inherit"
            aria-label="open menu"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: 360,
              bgcolor: "#050505",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: "flex" }}
          >
            <Logo size={52} />
          </Link>
          <IconButton
            aria-label="close menu"
            onClick={() => setOpen(false)}
            sx={{ color: "#fff", bgcolor: "rgba(255,255,255,0.1)" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(108,198,68,0.5)" }} />

        <List sx={{ px: 2, py: 0 }}>
          {links.map((l) => (
            <Box key={l.href}>
              <ListItemButton
                component={Link}
                href={l.href}
                onClick={() => setOpen(false)}
                sx={{ px: 0, py: 2 }}
              >
                <ListItemText
                  primary={l.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        fontSize: "0.85rem",
                        color: pathname === l.href ? "secondary.main" : "#fff",
                      },
                    },
                  }}
                />
              </ListItemButton>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
            </Box>
          ))}
        </List>

        <Box sx={{ px: 2, mt: 3 }}>
          {/* <Button
            component={Link}
            href="/reservation"
            variant="contained"
            color="secondary"
            fullWidth
            size="large"
            onClick={() => setOpen(false)}
          >
            Book a free trial
          </Button> */}
        </Box>
      </Drawer>
    </>
  );
}
