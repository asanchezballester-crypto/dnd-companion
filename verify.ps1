$f = 'C:\Users\foxky\.gemini\antigravity\scratch\dnd-pwa\spells_db.js'
$c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
# Search for the exact unicode character á (U+00E1) preceded by "pies"
$pattern = 'pies' + [char]0x00E1 + 's'
$idx = $c.IndexOf($pattern)
if ($idx -eq -1) {
    Write-Output "No more 'piesás' found! All clean."
} else {
    Write-Output "Still found at index $idx"
    Write-Output "Context: $($c.Substring([Math]::Max(0, $idx - 30), 80))"
}
